<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>7 Common Base64 Corruption Patterns • AxelBase</title>
  <meta name="description" content="Learn to spot and fix the most frequent Base64 errors: line breaks, missing padding, wrong alphabet, and more." />
  <meta property="og:title" content="Common Base64 Corruption Patterns • AxelBase" />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Base64 Corruption</p>
  </div>

  <article class="prose">
    <h1>7 Most Common Base64 Corruption Patterns (and How to Fix Them)</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>AxelBase detects and warns about these real-world issues instantly:</p>
    <ol>
      <li>Missing or incorrect padding (=)</li>
      <li>Line breaks or whitespace in the middle</li>
      <li>Wrong alphabet (+/ vs -_)</li>
      <li>Truncated strings (not mod 4)</li>
      <li>Double-encoding</li>
      <li>URL percent-encoding applied</li>
      <li>Non-Base64 characters present</li>
    </ol>

    <h2>How AxelBase Helps</h2>
    <p>Real-time validation with clear error messages and auto-correction suggestions.</p>

    <p class="italic-note">Good tools don’t just work — they help you when things go wrong.</p>
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
  .italic-note { font-style: italic; text-align: center; color: #666; margin-top: 3rem; }
</style>