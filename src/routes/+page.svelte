<script lang="ts">
	import Bookmarks from '../lib/components/Bookmarks.svelte';
	import Calculator from '../lib/components/Calculator.svelte';
	import CodeMinifier from '../lib/components/CodeMinifier.svelte';
	import ConversionTables from '../lib/components/ConversionTables.svelte';
	import SyntaxLibraries from '../lib/components/SyntaxLibraries.svelte';
	import GradientGenerator from '../lib/components/GradientGenerator.svelte';
	import SnippetsClipboard from '../lib/components/SnippetsClipboard.svelte';
</script>

<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
	<Bookmarks />
	<Calculator />
	<CodeMinifier />
	<ConversionTables />
	<SyntaxLibraries />
	<GradientGenerator />
	<SnippetsClipboard />
</div>

<style>
	/* Add Tailwind or custom styles */
</style>
