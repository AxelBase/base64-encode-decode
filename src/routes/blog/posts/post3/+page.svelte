<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How Base64 Padding Works • AxelBase Technical Guide</title>
  <meta name="description" content="Master Base64 padding rules: why = and == are added, when they're required, and how decoders handle missing or incorrect padding." />
  <meta property="og:title" content="How Base64 Padding Works • AxelBase" />
  <meta property="og:description" content="Complete guide to Base64 = padding: why it exists, how it's calculated, and common errors." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Base64 Padding Explained</p>
  </div>

  <article class="prose">
    <h1>How Base64 Padding Works (and Why It’s Required)</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>Padding is one of the most misunderstood aspects of Base64 — yet it's critical for correct decoding. The = character is not random: it's a precise signal about how many bytes were in the original data.</p>

    <h2>The Math Behind Padding</h2>
    <p>Base64 processes data in 3-byte chunks → producing 4 output characters. When the input length isn’t divisible by 3:</p>
    <ul>
      <li><strong>1 byte remaining</strong> → only 2 valid output chars → add ==</li>
      <li><strong>2 bytes remaining</strong> → 3 valid output chars → add =</li>
      <li><strong>0 bytes remaining</strong> → no padding needed</li>
    </ul>

    <h3>Example: Encoding "Hi"</h3>
    <p>"Hi" = 2 bytes → produces 3 Base64 chars + one =</p>
    <p>Result: <code>SGk=</code></p>

    <h2>Why Padding Cannot Be Optional</h2>
    <p>Without padding, decoders cannot know how many of the final 6-bit groups contain real data. Removing = breaks round-trip integrity.</p>

    <h2>Common Padding Mistakes</h2>
    <ul>
      <li>Stripping all = characters (very common!)</li>
      <li>Adding incorrect number of =</li>
      <li>Using Base64url and forgetting to re-add padding before decoding</li>
    </ul>

    <h2>How Smart Decoders Handle It</h2>
    <p>AxelBase and modern libraries are tolerant: they accept missing padding and infer it from string length (mod 4). But never rely on tolerance — always encode correctly.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Is it safe to remove padding?</summary>
      <p>Only if your decoder explicitly supports it. Never assume.</p>
    </details>
    <details>
      <summary>Why do some APIs omit padding?</summary>
      <p>For brevity in Base64url contexts — but they must document it clearly.</p>
    </details>

    <p class="italic-note">Correct padding = reliable decoding. Never compromise on it in production systems.</p>
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