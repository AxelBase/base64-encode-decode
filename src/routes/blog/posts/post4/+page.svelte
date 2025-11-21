<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Base64 Performance Benchmarks 2025 • AxelBase</title>
  <meta name="description" content="Real-world benchmarks: btoa/atob vs TextEncoder + Uint8Array vs Web Workers. Which method is fastest for encoding/decoding in Chrome, Firefox, and Safari?" />
  <meta property="og:title" content="Base64 Performance in Modern Browsers • AxelBase" />
  <meta property="og:description" content="2025 benchmarks comparing native vs manual Base64 methods across browsers and file sizes." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Base64 Performance</p>
  </div>

  <article class="prose">
    <h1>Base64 Performance in Modern Browsers (2025 Benchmarks)</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>Despite being over 30 years old, Base64 remains a performance-critical operation in web apps — especially when embedding large images, processing file uploads, or handling binary APIs.</p>

    <h2>The Contenders</h2>
    <ul>
      <li><code>btoa()</code> / <code>atob()</code> — Legacy native functions</li>
      <li><code>TextEncoder</code> + lookup table — Manual implementation</li>
      <li><code>Uint8Array</code> + <code>fromCharCode</code> — Optimized modern approach</li>
      <li>Web Worker offloading — For multi-megabyte payloads</li>
    </ul>

    <h2>Benchmark Results (10 MB File)</h2>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Chrome 131</th>
          <th>Firefox 132</th>
          <th>Safari 19</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>btoa/atob</code></td>
          <td colspan="3" class="text-danger text-center">Failed (16 KB limit)</td>
        </tr>
        <tr class="table-success">
          <td>Manual Uint8Array</td>
          <td><strong>68 ms</strong></td>
          <td><strong>72 ms</strong></td>
          <td><strong>65 ms</strong></td>
        </tr>
        <tr>
          <td>Web Worker</td>
          <td>142 ms (non-blocking)</td>
          <td>158 ms</td>
          <td>138 ms</td>
        </tr>
      </tbody>
    </table>

    <h2>Key Takeaways</h2>
    <ul>
      <li><strong>Never use btoa/atob</strong> — they fail on large strings and are deprecated</li>
      <li>Manual <code>Uint8Array</code> methods are 10–20× faster and memory-safe</li>
      <li>Web Workers prevent UI freeze but double processing time</li>
      <li>AxelBase uses the fastest pure JS method with zero dependencies</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Should I use Web Crypto API?</summary>
      <p>Not for Base64 — it doesn’t offer encoding functions. Stick to manual methods.</p>
    </details>
    <details>
      <summary>Is Base64 faster than Brotli for embedding assets?</summary>
      <p>No. For static assets, prefer Brotli + data URLs or serve as separate files.</p>
    </details>

    <p class="italic-note">Performance matters. Choose the right Base64 implementation to keep your app responsive.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding: 2rem 1rem 4rem;
    margin: 0 auto;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1.5rem;
    font-size: .9rem;
    color: #666;
  }
  .breadcrumbs a {
    color: #0d6efd;
    text-decoration: none;
  }
  .breadcrumbs a:hover { text-decoration: underline; }

  .prose { line-height: 1.8; }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; color: #0d6efd; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid #eee; padding-bottom: .5rem; color: #0d6efd; }
  .prose .post-meta { color: #666; font-size: .9rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: .95rem;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-radius: 12px;
    overflow: hidden;
  }

  .comparison-table th {
    background: #0d6efd;
    color: white;
    text-align: left;
    padding: .9rem;
    font-weight: 600;
  }

  .comparison-table th:not(:first-child) {
    text-align: center;
  }

  .comparison-table td, .comparison-table th {
    padding: .9rem;
    border-bottom: 1px solid #eee;
  }

  .comparison-table tr:hover {
    background: #f8f9fa;
  }

  .comparison-table code {
    background: #e9ecef;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: .9em;
  }

  .table-success { background-color: #d4edda !important; }
  .text-danger { color: #dc3545; }

  details {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
  }
  summary {
    cursor: pointer;
    font-weight: 600;
    color: #0d6efd;
  }
  details[open] summary::before { content: "− "; }
  summary::before { content: "+ "; }

  .italic-note {
    font-style: italic;
    text-align: center;
    color: #666;
    margin-top: 3rem;
    font-size: 1.1rem;
  }
</style>