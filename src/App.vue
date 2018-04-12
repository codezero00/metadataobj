<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style>
::-webkit-scrollbar-track
{
	/* -webkit-box-shadow: inset 0 0 1px rgba(100,100,100,0.3); */
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-color: #ACAFB7;
	border: 1px solid #ddd;
	border-radius: 5px;
}

</style>