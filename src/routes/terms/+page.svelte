<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions • AxelBase – Base64 Encoder & Decoder</title>
  <meta name="description" content="Terms of use for AxelBase — a free, open-source, offline-first Base64 tool." />
  <meta property="og:title" content="Terms & Conditions • AxelBase" />
  <meta property="og:description" content="Free to use, modify, and distribute. No warranty, no liability." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs mb-4">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="prose mx-auto">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: November 21, 2025</p>

    <p>By using <strong>AxelBase</strong> ("the tool"), you agree to these Terms.</p>

    <h2>1. Nature of the Tool</h2>
    <p>AxelBase is a <strong>free, open-source</strong>, client-side web application for encoding and decoding Base64 data. It runs entirely in your browser with <strong>no server interaction</strong>.</p>

    <h2>2. License & Usage Rights</h2>
    <p>The tool is released under the <strong>MIT License</strong>. You may:</p>
    <ul>
      <li>Use it for personal or commercial projects</li>
      <li>Modify, fork, or redistribute the code</li>
      <li>Host it on your own domain or GitHub Pages</li>
    </ul>
    <p>No attribution is required, but always appreciated</p>

    <h2>3. No Warranty</h2>
    <p>AxelBase is provided **"as is"** without warranty of any kind, express or implied, including but not limited to:</p>
    <ul>
      <li>Accuracy of encoding/decoding</li>
      <li>Fitness for a particular purpose</li>
      <li>Non-infringement</li>
    </ul>
    <p>Use at your own risk.</p>

    <h2>4. Limitation of Liability</h2>
    <p>In no event shall the authors or contributors be liable for any claim, damages, or other liability arising from:</p>
    <ul>
      <li>Data loss or corruption</li>
      <li>Incorrect Base64 encoding/decoding</li>
      <li>Use with sensitive or regulated data</li>
      <li>Any indirect, incidental, or consequential damages</li>
    </ul>

    <h2>5. Prohibited Uses</h2>
    <p>You may not use AxelBase to:</p>
    <ul>
      <li>Violate any laws or regulations</li>
      <li>Process illegal content</li>
      <li>Attempt to reverse-engineer or misuse the tool in bad faith</li>
    </ul>

    <h2>6. Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.</p>

    <h2>7. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense</p>

    <p class="italic-note">
      <strong>Simple rule:</strong> Use responsibly. Share freely. Break nothing important.<br>
      That’s all we ask.
    </p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; }
  .breadcrumbs { font-size: .95rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .prose h1 { font-size: 2.8rem; color: #0d6efd; margin-bottom: .5rem; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; border-bottom: 1px solid #eee; padding-bottom: .5rem; }
  .post-meta { color: #666; font-size: .9rem; margin-bottom: 2rem; }
  .italic-note { font-style: italic; text-align: center; color: #444; margin-top: 4rem; font-size: 1.1rem; }
</style>