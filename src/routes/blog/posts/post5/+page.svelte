<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Streaming Large Files to Base64 • AxelBase Guide</title>
  <meta name="description" content="Learn how to safely encode multi-gigabyte files to Base64 using chunked processing, FileReader streams, and memory-safe techniques." />
  <meta property="og:title" content="Streaming Large Files to Base64 • AxelBase" />
  <meta property="og:description" content="Avoid Out-of-Memory crashes when encoding huge files in the browser." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Streaming Large Files</p>
  </div>

  <article class="prose">
    <h1>Streaming Large Files to Base64 Without Crashing the Browser</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>One of the biggest pitfalls in client-side Base64 tools is attempting to read an entire large file (100 MB+) into memory at once — causing Out-of-Memory (OOM) crashes.</p>

    <h2>The Correct Approach: Chunked Streaming</h2>
    <p>Use the FileReader API with <code>slice()</code> to process the file in small chunks (e.g. 1–5 MB):</p>
    <ul>
      <li>Read chunk → convert to Base64 → append to result</li>
      <li>Free memory with each iteration</li>
      <li>Update progress bar in real time</li>
      <li>Never exceed ~50 MB in memory</li>
    </ul>

    <h2>Why AxelBase Doesn't Crash</h2>
    <p>Our encoder uses <strong>streaming + requestAnimationFrame</strong> to yield control back to the browser, preventing freezes even on 1 GB+ files.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I use FileReader.readAsDataURL()?</summary>
      <p>Never for large files — it loads everything into memory at once.</p>
    </details>
    <details>
      <summary>What about Web Workers?</summary>
      <p>Helpful, but not sufficient alone. You still need chunking.</p>
    </details>

    <p class="italic-note">Large file support is a hallmark of professional web tools. Do it right — or don’t do it at all.</p>
  </article>
</div>

<style>
  /* Same shared styles as before */
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; color: #0d6efd; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid #eee; padding-bottom: .5rem; color: #0d6efd; }
  .prose .post-meta { color: #666; font-size: .9rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
  .prose ul { padding-left: 1.5rem; }
  .prose details { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
  .prose summary { cursor: pointer; font-weight: 600; color: #0d6efd; }
  .prose details[open] summary::before { content: "−"; margin-right: .5rem; }
  .prose summary::before { content: "+"; margin-right: .5rem; }
  .italic-note { font-style: italic; text-align: center; color: #666; margin-top: 3rem; }
</style>