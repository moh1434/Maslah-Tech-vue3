<script setup lang="ts"></script>

<template>
	<div class="why-maslaha">
		<slot name="icon">
			<svg>
				<use xlink:href="#" />
			</svg>
		</slot>

		<slot name="title">
			<h3>
				<slot name="title-text">Title</slot>
			</h3>
		</slot>
		<slot name="p">
			<p>
				<slot name="p-text">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
					voluptates, in sint cum neque nostrum enim,
				</slot>
			</p>
		</slot>
	</div>
</template>

<style>
.why-maslaha {
	color: rgba(255, 255, 255, 0.95);
	@apply my-8;
}
.why-maslaha svg {
	fill: rgba(255, 255, 255, 0.95);
	height: 70px;
	display: inline-block;
	text-align: center;

	@apply mb-2;
}
.why-maslaha h3 {
	font-weight: bold;
	font-size: 1.1rem;
}
.why-maslaha p {
	text-align: center;
	@apply px-8;
}
/* @media screen(lg) {
  .why-maslaha h3 {
    @apply text-xl;
  }

  .why-maslaha p {
    @apply text-lg;
  }
} */
</style>
