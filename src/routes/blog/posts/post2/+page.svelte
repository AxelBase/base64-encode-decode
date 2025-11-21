<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Base64 vs Base64url: When to Use Which • AxelBase</title>
  <meta name="description" content="Learn the critical differences between standard Base64 and Base64url, character substitutions, padding rules, and real-world use cases." />
  <meta property="og:title" content="Base64 vs Base64url: When to Use Which • AxelBase" />
  <meta property="og:description" content="Understand when to use Base64 vs Base64url in URLs, JWTs, filenames, and APIs." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Base64 vs Base64url</p>
  </div>

  <article class="prose">
    <h1>Base64 vs Base64url: When to Use Which</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>While both are Base64 variants, <strong>Base64url</strong> (also called "URL-safe Base64") was specifically designed to be safely embedded in URLs, filenames, and query parameters without encoding issues.</p>

    <h2>The Key Differences</h2>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Standard Base64</th>
          <th>Base64url</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Character 62</td>
          <td><code>+</code></td>
          <td><code>-</code></td>
        </tr>
        <tr>
          <td>Character 63</td>
          <td><code>/</code></td>
          <td><code>_</code></td>
        </tr>
        <tr>
          <td>Padding</td>
          <td>Required (<code>=</code>)</td>
          <td>Omitted when possible</td>
        </tr>
        <tr>
          <td>Safe in URLs?</td>
          <td>No (needs encoding)</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>

    <h2>Real-World Use Cases</h2>
    <p><strong>Use Base64url when:</strong></p>
    <ul>
      <li>Encoding JWT tokens (header.payload.signature)</li>
      <li>Passing binary data in URL parameters</li>
      <li>Using in filenames or DOM IDs</li>
      <li>Working with cookies or localStorage keys</li>
    </ul>

    <p><strong>Use standard Base64 when:</strong></p>
    <ul>
      <li>Following strict RFC 4648 compliance</li>
      <li>Interfacing with legacy systems</li>
      <li>Encoding email attachments (MIME)</li>
      <li>Using data: URIs in older browsers</li>
    </ul>

    <h2>Performance & Compatibility</h2>
    <p>Modern browsers and libraries (including AxelBase) support both seamlessly. The conversion is trivial and has negligible performance impact.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I convert between them safely?</summary>
      <p>Yes — just replace <code>+</code> → <code>-</code>, <code>/</code> → <code>_</code>, and remove <code>=</code> padding (for Base64url).</p>
    </details>
    <details>
      <summary>Do all decoders accept Base64url?</summary>
      <p>Most modern ones do. Always test if targeting very old systems.</p>
    </details>

    <p class="italic-note">Choose the right variant for your context — it prevents bugs and saves debugging time.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }

  .prose { line-height: 1.8; }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; color: #0d6efd; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid #eee; padding-bottom: .5rem; color: #0d6efd; }
  .prose .post-meta { color: #666; font-size: .9rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: .95rem;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .comparison-table th {
    background: #0d6efd;
    color: white;
    text-align: left;
    padding: .75rem;
  }

  .comparison-table td, .comparison-table th {
    padding: .75rem;
    border-bottom: 1px solid #eee;
  }

  .comparison-table tr:hover {
    background: #f8f9fa;
  }

  .comparison-table code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: .9em;
  }

  details { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
  summary { cursor: pointer; font-weight: 600; color: #0d6efd; }
  details[open] summary::before { content: "−"; margin-right: .5rem; }
  summary::before { content: "+"; margin-right: .5rem; }

  .italic-note {
    font-style: italic;
    text-align: center;
    color: #666;
    margin-top: 3rem;
  }
</style>