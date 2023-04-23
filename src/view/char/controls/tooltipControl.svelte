<span class="tooltip">
	<slot />

	<div class="tooltiptext">
		<div class="container">
			<slot name="tooltip">
				<span class="missing">Unknown tooltip</span>
			</slot>
		</div>
	</div>
</span>

<style lang="scss">
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
	}

	.tooltip ul * {
		list-style: none;
	}

	/* Tooltip text */
	.tooltip > .tooltiptext > * {
		overflow: auto;
		max-height: 300px;
		margin: 0px var(--spacing);
	}

	.tooltip > .tooltiptext {
		visibility: hidden;
		background-color: var(--blockquote-border-color);
		color: #fff;
		text-align: center;
		border-radius: 6px;

		padding: 0.5em;

		/* Position the tooltip text */
		position: absolute;
		z-index: 1;
		bottom: 100%;
		left: 50%;
		margin-left: -50%;

		/* Fade in tooltip */
		opacity: 0;
		transition: opacity 0.3s;
		& > .container {
			min-width: 220px;
			max-width: 520px;
			max-height: 15rem;
			height: max-content;
			overflow-y: auto;
			width: max-content;
		}
	}

	@media screen and (max-width: 520px) {
		.tooltip > .tooltiptext {
			max-width: calc(100vw - var(--spacing) * 2);

			margin-left: calc(-1 * var(--spacing));
			left: 0px;
			min-width: unset;
		}
	}

	/* Tooltip arrow */
	.tooltip > .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 60px;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;

		border-color: var(--blockquote-border-color) transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}

	.parenthised:not(:empty)::before {
		content: '(';
	}
	.parenthised:not(:empty)::after {
		margin-left: -0.2em;
		content: ')';
	}
</style>
