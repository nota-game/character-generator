<script lang="ts">
	import TreeNode from './tree-node.svelte';
	export let tree: WithChildren<any>[] = [];
	type WithChildren<T> = T & {
		children: WithChildren<T>[];
	};
</script>

{#each tree as _node, i}
	<TreeNode node={_node} index={i} let:node>
		<slot {node}>
			<div class="name">{node.name}</div>
		</slot>
	</TreeNode>
{/each}
