<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy • AxelBase – Base64 Encoder & Decoder</title>
  <meta name="description" content="AxelBase collects zero data. Everything runs 100% in your browser. No tracking, no cookies, no servers." />
  <meta property="og:title" content="Privacy Policy • AxelBase" />
  <meta property="og:description" content="We don’t collect, store, or transmit any data — ever. Your files and text never leave your device." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs mb-4">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="prose mx-auto">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 21, 2025</p>

    <p>At <strong>AxelBase</strong>, your privacy is not a feature — it’s the entire foundation of this tool.</p>

    <h2>We Collect Absolutely Nothing</h2>
    <p>AxelBase is a <strong>100% client-side</strong> Base64 encoder and decoder. This means:</p>
    <ul>
      <li><strong>No servers</strong> — no backend, no database, no logs</li>
      <li><strong>No analytics</strong> — no Google Analytics, Plausible, Umami, or any tracking</li>
      <li><strong>No cookies</strong> — not even session cookies</li>
      <li><strong>No IP logging</strong> — we cannot see who you are or where you’re from</li>
      <li><strong>No file uploads</strong> — your files are read locally via the browser’s File API and never leave your device</li>
    </ul>

    <h2>How It Actually Works</h2>
    <p>When you:</p>
    <ul>
      <li>Paste text → processed instantly in your browser memory</li>
      <li>Drop a file → read using <code>FileReader</code> in chunks, never sent anywhere</li>
      <li>Click “Copy” or “Download” → handled natively by your browser</li>
    </ul>
    <p><em>All computation happens on your machine. We have zero access.</em></p>

    <h2>Third-Party Services</h2>
    <p>We do <strong>not</strong> use any third-party scripts, CDNs that track, advertising networks, or social media widgets. The only external resource is Bootstrap CSS (via jsDelivr CDN) for styling — it contains no trackers.</p>

    <h2>Local Storage & Session Data</h2>
    <p>The tool does <strong>not</strong> use <code>localStorage</code> or <code>IndexedDB</code>. Your input is held only in RAM and is cleared when you close or refresh the page.</p>

    <h2>Security = Privacy by Default</h2>
    <p>Because nothing ever leaves your browser, AxelBase is safe for:</p>
    <ul>
      <li>Sensitive documents</li>
      <li>Private keys & certificates</li>
      <li>Internal company data</li>
      <li>Legal or medical files</li>
    </ul>

    <h2>Children’s Privacy</h2>
    <p>This tool does not target children and collects no data from anyone.</p>

    <h2>Changes to This Policy</h2>
    <p>If we ever change this policy (extremely unlikely), the new version will be posted here with an updated date.</p>

    <h2>Contact</h2>
    <p>Questions? Open an issue on our <a href="https://github.com/axelbase/base64-encode-decode" target="_blank" rel="noopener">GitHub repository</a>.</p>

    <p class="italic-note">
      <strong>Your data belongs to you — always has, always will.</strong><br>
      Thank you for trusting AxelBase.
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
  ul { padding-left: 1.5rem; }
  li { margin: .5rem 0; }
  code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
</style>