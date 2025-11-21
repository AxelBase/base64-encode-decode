<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>What is Base64? The Complete Technical Breakdown • AxelBase</title>
  <meta name="description" content="Understand exactly how Base64 encoding works: 6-bit grouping, the 64-character alphabet, padding rules, and why it's essential for web data transmission." />
  <meta property="og:title" content="What is Base64? The Complete Technical Breakdown • AxelBase" />
  <meta property="og:description" content="Deep dive into the Base64 algorithm: 6-bit chunks, padding with '=', and why it's used in data URIs, email attachments, and APIs." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>What is Base64?</p>
  </div>

  <article class="prose">
    <h1>What is Base64? The Complete Technical Breakdown</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>Base64 is a binary-to-text encoding scheme that converts arbitrary binary data into a safe, ASCII-only string using a 64-character alphabet. It is defined in RFC 4648 and is one of the most widely used encoding methods on the web.</p>

    <h2>How Base64 Actually Works</h2>
    <p>At its core, Base64 takes every 3 bytes (24 bits) of input and splits them into four 6-bit groups. Each 6-bit group is then mapped to one of 64 printable ASCII characters:</p>
    <ul>
      <li>A–Z → 0–25</li>
      <li>a–z → 26–51</li>
      <li>0–9 → 52–61</li>
      <li>+ and / → 62 and 63</li>
      <li>= (padding) → used when input length isn't divisible by 3</li>
    </ul>

    <h3>Why 6 Bits?</h3>
    <p>Because 2⁶ = 64 — exactly the number needed to represent all possible values of a 6-bit chunk using printable characters. This ensures no control characters or whitespace interfere with transmission.</p>

    <h3>Padding with =</h3>
    <p>When the input byte length is not a multiple of 3, padding is added:</p>
      <ul>
        <li>1 byte → 2 characters + ==</li>
        <li>2 bytes → 3 characters + =</li>
        <li>3 bytes → 4 characters (no padding)</li>
      </ul>

    <h2>Where Base64 Is Used</h2>
    <p>Despite its 33% size overhead, Base64 remains essential in:</p>
    <ul>
      <li><strong>data: URIs</strong> — embedding images/audio directly in HTML/CSS</li>
      <li><strong>JSON Web Tokens (JWT)</strong> — header and payload are Base64url encoded</li>
      <li><strong>HTTP Basic Auth</strong> — credentials sent as Base64</li>
      <li><strong>Email attachments (MIME)</strong> — original reason Base64 was created</li>
      <li><strong>File uploads in APIs</strong> — when binary data must be sent as text</li>
    </ul>

    <h2>Base64 vs Base64url</h2>
    <p>The URL-safe variant replaces + with - and / with _ and omits padding. This prevents issues in URLs and filenames while maintaining compatibility.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Is Base64 encryption?</summary>
      <p>No. Base64 is encoding, not encryption. It provides zero security — anyone can decode it instantly.</p>
    </details>
    <details>
      <summary>Can I remove the = padding?</summary>
      <p>Only if the decoder explicitly supports it. Most standard implementations require correct padding.</p>
    </details>
    <details>
      <summary>Why not use hexadecimal instead?</summary>
      <p>Hex is 100% overhead (2 chars per byte) vs Base64’s 33%. Base64 is far more compact.</p>
    </details>

    <p class="italic-note">Understanding Base64 is essential for any web developer working with binary data in text-based protocols.</p>
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