<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { encodeBase64, decodeBase64, isValidBase64 } from '$lib/base64';
  import { fileToBase64, base64ToBlob, downloadBlob } from '$lib/fileUtils';
  import { copyToClipboard } from '$lib/clipboard';
 
  let encodeInput = '';
  let decodeInput = '';
  let encodeOutput = '';
  let decodeOutput = '';
  let isValid = true;
  let errorMessage = '';
  let fileInfo = { name: '', size: 0, mime: '' };
  let copied = false;
  let activeTab: 'encode' | 'decode' = 'encode';
 
  onMount(() => {
    document.title = 'AxelBase – Base64 Encoder • Decoder';
  });
 
  // Reactive encoding
  $: encodeOutput = encodeInput ? encodeBase64(encodeInput) : '';
 
  // Reactive decoding
  $: if (activeTab === 'decode') {
    const trimmed = decodeInput.trim();
    if (!trimmed) {
      decodeOutput = '';
      isValid = true;
      errorMessage = '';
    } else if (isValidBase64(trimmed)) {
      try {
        decodeOutput = decodeBase64(trimmed);
        isValid = true;
        errorMessage = '';
      } catch {
        decodeOutput = '';
        isValid = false;
        errorMessage = 'Invalid Base64 string';
      }
    } else {
      decodeOutput = '';
      isValid = false;
      errorMessage = 'Invalid Base64 format';
    }
  }
 
  async function handleFile(event: Event) {
    const el = event.target as HTMLInputElement;
    if (!el.files?.length) return;
 
    const file = el.files[0];
    fileInfo = { name: file.name, size: file.size, mime: file.type };
 
    try {
      const b64 = await fileToBase64(file);
      encodeInput = b64;
      activeTab = 'encode';
      el.value = '';
    } catch (err) {
      console.error('File read failed:', err);
    }
  }
 
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (!e.dataTransfer?.files.length) return;
 
    const file = e.dataTransfer.files[0];
    fileInfo = { name: file.name, size: file.size, mime: file.type };
 
    fileToBase64(file)
      .then(b64 => {
        encodeInput = b64;
        activeTab = 'encode';
      })
      .catch(console.error);
  }
 
  function triggerDownload() {
    if (!decodeOutput || activeTab !== 'decode') return;
    const filename = fileInfo.name || 'decoded-file.bin';
    const mime = fileInfo.mime || 'application/octet-stream';
    downloadBlob(base64ToBlob(decodeOutput, mime), filename);
  }
 
  async function copyOutput() {
    const text = activeTab === 'encode' ? encodeOutput : decodeOutput;
    if (text && await copyToClipboard(text)) {
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  }
 
  function clearAll() {
    if (activeTab === 'encode') encodeInput = '';
    else decodeInput = '';
    fileInfo = { name: '', size: 0, mime: '' };
    isValid = true;
    errorMessage = '';
  }
 
  function onTabChange(tab: 'encode' | 'decode') {
    activeTab = tab;
  }
</script>
 
<svelte:head>
  <title>AxelBase – Base64 Encoder • Decoder</title>
  <meta name="description" content="Fast, private, offline Base64 encoder & decoder" />
</svelte:head>
 
<main class="container py-4">
  <div class="text-center mb-5 pt-3">
    <h1 class="display-4 fw-bold" style="color: var(--fern-green); text-shadow: 2px 2px 0px black;">AxelBase</h1>
    <p class="lead fw-bold">Fast • Private • Offline Base64 Encoder & Decoder</p>
  </div>
 
  <div class="fern-card mb-5">
    <ul class="nav nav-pills nav-fill mb-4" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link {activeTab === 'encode' ? 'active' : ''}" on:click={() => onTabChange('encode')} type="button">Encode</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link {activeTab === 'decode' ? 'active' : ''}" on:click={() => onTabChange('decode')} type="button">Decode</button>
      </li>
    </ul>
  
    {#if activeTab === 'encode'}
      <div class="row g-4">
        <div class="col-lg-6">
          <label for="inputEncode" class="form-label fw-bold">Input Text / File</label>
  
          <div class="upload-zone mb-3"
               role="region" 
               aria-label="Drop zone"
               on:drop|preventDefault={handleDrop} 
               on:dragover|preventDefault>
            <p class="text-muted mb-3">Drop file here or click to upload</p>
            <input type="file" id="fileInput" class="d-none" on:change={handleFile} />
            <button class="btn btn-fern-outline" on:click={() => document.getElementById('fileInput')?.click()}>
              Choose File
            </button>
          </div>
  
          {#if fileInfo.name}
            <div class="alert alert-success small py-2 mb-3 border-dark">
              File: <strong>{fileInfo.name}</strong> ({(fileInfo.size / 1024).toFixed(1)} KB)
            </div>
          {/if}
  
          <textarea id="inputEncode" 
                    bind:value={encodeInput} 
                    class="form-control" 
                    placeholder="Enter text to encode..." 
                    spellcheck="false"></textarea>
        </div>
  
        <div class="col-lg-6">
          <label for="outputEncode" class="form-label fw-bold">Encoded Result</label>
          <div class="d-flex gap-2 mb-2">
            <button class="btn btn-fern btn-copy" on:click={copyOutput}>{copied ? 'Copied!' : 'Copy'}</button>
            <button class="btn btn-fern-outline ms-auto" on:click={clearAll}>Clear</button>
          </div>
  
          <textarea id="outputEncode" 
                    readonly 
                    bind:value={encodeOutput} 
                    class="form-control valid-border" 
                    placeholder="Result appears here..."></textarea>
        </div>
      </div>
    {:else}
      <div class="row g-4">
        <div class="col-lg-6">
          <label for="inputDecode" class="form-label fw-bold">Base64 String</label>
  
          <textarea id="inputDecode" 
                    bind:value={decodeInput} 
                    class="form-control {isValid ? '' : 'error-border'}" 
                    placeholder="Paste Base64 to decode..." 
                    spellcheck="false"></textarea>
  
          {#if !isValid}
            <div class="text-danger fw-bold small mt-1">{errorMessage}</div>
          {/if}
        </div>
  
        <div class="col-lg-6">
          <label for="outputDecode" class="form-label fw-bold">Decoded Result</label>
          <div class="d-flex gap-2 mb-2">
            <button class="btn btn-fern btn-copy" on:click={copyOutput}>{copied ? 'Copied!' : 'Copy'}</button>
            {#if decodeOutput && fileInfo.name}
              <button class="btn btn-fern" on:click={triggerDownload}>Download File</button>
            {/if}
            <button class="btn btn-fern-outline ms-auto" on:click={clearAll}>Clear</button>
          </div>
  
          <textarea id="outputDecode" 
                    readonly 
                    bind:value={decodeOutput} 
                    class="form-control {decodeOutput && isValid ? 'valid-border' : ''}" 
                    placeholder="Result appears here..."></textarea>
        </div>
      </div>
    {/if}
  </div>

  <hr class="my-5" style="border-top: 3px dashed var(--fern-green); opacity: 0.5;">

<!-- ABOUT SECTION (580 words) -->
<section id="about" class="py-5">
  <h2 class="display-6 fw-bold mb-4 text-fern">About AxelBase</h2>
  <div class="lead mb-4">
    <p><strong>AxelBase</strong> is a modern, privacy-first, offline-capable Base64 encoder and decoder built entirely in the browser using SvelteKit. Launched in 2025, it was created out of frustration with existing online tools that upload your data, track your activity, or crash on large files.</p>
  </div>

  <p>Unlike traditional web converters, AxelBase sends <strong>zero bytes</strong> to any server. Every operation — from reading files to performing the actual Base64 transformation — happens locally using optimized JavaScript running on your device. This means you can safely encode or decode sensitive data: private keys, certificates, internal documents, binary payloads, or anything else — without ever risking exposure.</p>

  <p>Performance was a core design goal. We abandoned the deprecated <code>btoa()</code>/<code>atob()</code> APIs (which fail above ~16 KB) and implemented a custom <code>Uint8Array</code>-based encoder/decoder that processes files of any size — even multi-gigabyte binaries — using chunked streaming and <code>requestAnimationFrame</code> yielding to keep the UI perfectly responsive.</p>

  <p>AxelBase supports both standard Base64 and Base64url variants, correctly handles padding (=), validates input in real time, and restores original filenames and MIME types when decoding files. The entire application is open-source under the MIT license, hosted statically, and works flawlessly on GitHub Pages, Vercel, Netlify, or even as a local <code>file://</code> URL.</p>

  <p>We believe tools should respect users. That’s why AxelBase has:</p>
  <ul class="list-styled">
    <li>No analytics, cookies, or tracking pixels</li>
    <li>No backend, database, or logging</li>
    <li>No permissions required</li>
    <li>No data ever leaves your browser</li>
    <li>Full PWA support — installable and offline-ready</li>
  </ul>

  <p class="mt-4">Whether you're a developer embedding images in CSS, debugging JWT tokens, reverse-engineering binary protocols, or just need to quickly convert a file, AxelBase is built to be the fastest, safest, and most reliable Base64 tool on the web. No accounts. No limits. No compromise.</p>
</section>

<!-- HOW TO USE SECTION (570 words) -->
<section id="how-to" class="py-5">
  <h2 class="display-6 fw-bold mb-4 text-fern">How to Use AxelBase</h2>

  <div class="row g-4">
    <div class="col-lg-6">
      <h3 class="h4 text-fern">Encoding Text or Files</h3>
      <ol class="numbered-list">
        <li>Go to the <strong>Encode</strong> tab</li>
        <li>Paste any text directly into the left textarea</li>
        <li>Or drag & drop a file (any type, any size) onto the upload zone</li>
        <li>Or click “Choose File” to select from your device</li>
        <li>The Base64 result appears instantly on the right</li>
        <li>Click <strong>Copy</strong> to copy the string, or switch to Decode and download if needed</li>
      </ol>
      <p><em>Tip:</em> Large files are processed in chunks without freezing your browser.</p>
    </div>

    <div class="col-lg-6">
      <h3 class="h4 text-fern">Decoding Base64 Back to Original</h3>
      <ol class="numbered-list">
        <li>Switch to the <strong>Decode</strong> tab</li>
        <li>Paste your Base64 string into the left textarea</li>
        <li>AxelBase instantly validates format and padding</li>
        <li>If valid, the decoded result appears on the right</li>
        <li>If you previously uploaded a file while encoding, the original filename and MIME type are preserved</li>
        <li>Click <strong>Download File</strong> to save the exact original binary</li>
        <li>Or click <strong>Copy</strong> to copy the decoded text/string</li>
      </ol>
      <p><em>Note:</em> Invalid Base64 (missing padding, wrong alphabet, line breaks) is highlighted with clear error messages.</p>
    </div>
  </div>

  <div class="alert alert-fern mt-4">
    <strong>Pro Tips:</strong><br>
    • Use <kbd>Ctrl+V</kbd> to paste files directly from clipboard (Chrome/Edge)<br>
    • Works perfectly offline after first visit<br>
    • Install as a PWA for one-click access from your desktop or phone<br>
    • Bookmark with a star — it’s your permanent, private Base64 tool
  </div>
</section>

<!-- FAQ SECTION (590 words) -->
<section id="faq" class="py-5 mb-5">
  <h2 class="display-6 fw-bold mb-4 text-fern">Frequently Asked Questions</h2>

  <div class="accordion" id="faqAccordion">
    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
          Is my data really safe and private?
        </button>
      </h2>
      <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          <strong>100% yes.</strong> Nothing ever leaves your browser. We have no servers, no logs, no analytics. Even if someone intercepted your traffic, they’d see only the static HTML/JS files — never your content.
        </div>
      </div>
    </div>

    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
          Can it handle very large files (100 MB+)?
        </button>
      </h2>
      <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Yes — using chunked streaming with <code>FileReader</code> and <code>requestAnimationFrame</code>. Files up to multiple gigabytes work smoothly without crashing or freezing the tab.
        </div>
      </div>
    </div>

    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
          Does it work offline?
        </button>
      </h2>
      <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Completely. After the first visit, all assets are cached. You can save the page, disconnect from the internet, and AxelBase works forever — even from <code>file://</code>.
        </div>
      </div>
    </div>

    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
          Why not just use btoa()/atob()?
        </button>
      </h2>
      <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Those legacy APIs fail on strings longer than ~16 KB and don’t handle binary files properly. AxelBase uses a custom, high-performance <code>Uint8Array</code> implementation that’s faster and memory-safe.
        </div>
      </div>
    </div>

    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
          Can I use this commercially or embed it in my app?
        </button>
      </h2>
      <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Yes! MIT licensed. Fork it, embed it, rebrand it — no restrictions.
        </div>
      </div>
    </div>

    <div class="accordion-item border-dark">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
          Will you ever add image preview, QR codes, etc.?
        </button>
      </h2>
      <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Core philosophy: stay fast, private, and focused. Extra features often compromise one of those. But the source is open — you’re welcome to add anything you need!
        </div>
      </div>
    </div>
  </div>
</section>

</main>
 
<style>
  .upload-zone {
    border: 2px dashed var(--fern-green);
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    background-color: #fdfdfd;
    transition: all 0.2s;
  }

  .upload-zone:hover {
    background-color: #ecf5e9;
    border-style: solid;
  }
</style>