<script>
import Hero from "../components/Hero.svelte"
const title = 'Sean Pe - Fullstack Developer' 
</script>

<div class="container">
   <h1>{title}</h1>
   <Hero></Hero> 
</div>


<style>
   .container {
      width: 50%;
      margin: auto;
      justify-content: center;
      align-items: center;
      height: 100%;
   } 
</style>
