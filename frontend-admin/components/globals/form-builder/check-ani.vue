<template>
  <main class="flex flexcenter marginleft050" >
		<div :style="{borderLeftColor: check ? '#1E88E5' : 'none', borderColor: check ? '#1E88E5' : 'none'}" :class="[check ? 'load-complete circle-loader' : 'circle-loader']">
			<div class="checkmark draw" :style="{display: check ? 'block' : ''}"></div>
		</div>
	</main>
</template>

<script>
export default {
	props: ['check']
}
</script>

<style>
 .circle-loader {
	 /* margin-bottom: 1em; */
	 /* border: 2px solid rgba(0, 0, 0, 0.2); */
	 animation: loader-spin 0.5s infinite linear;
	 position: relative;
	 /* display: inline-block; */
	 vertical-align: top;
	 border-radius: 50%;
	 width: 2em;
	 height: 2em;
}
 .load-complete {
	 -webkit-animation: none;
	 animation: none;
	 /* border-color: #5cb85c; */
	 transition: border 500ms ease-out;
}
 .checkmark {
	 display: none;
}
 .checkmark.draw:after {
	 animation-duration: 800ms;
	 animation-timing-function: ease;
	 animation-name: checkmark;
	 transform: scaleX(-1) rotate(135deg);
}
 .checkmark:after {
	 opacity: 1;
	 height: 1em;
	 width: 0.5em;
	 transform-origin: left top;
	 border-right: 2px solid #1E88E5;
	 border-top: 2px solid #1E88E5;
	 content: '';
	 left: 0.3666666667em;
	 top: 1em;
	 position: absolute;
}
 @keyframes loader-spin {
	 0% {
		 transform: rotate(0deg);
	}
	 100% {
		 transform: rotate(360deg);
	}
}
 @keyframes checkmark {
	 0% {
		 height: 0;
		 width: 0;
		 opacity: 1;
	}
	 20% {
		 height: 0;
		 width: 0.5em;
		 opacity: 1;
	}
	 40% {
		 height: 1em;
		 width: 0.5em;
		 opacity: 1;
	}
	 100% {
		 height: 1em;
		 width: 0.5em;
		 opacity: 1;
	}
}
 
 
 
</style>