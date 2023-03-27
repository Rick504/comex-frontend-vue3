<script setup lang="ts">
    import Tweter from '@/components/icons/Tweter.vue'
    import Instagram from '@/components/icons/Instagram.vue'
</script>

<template>
    <div>
        <img src="@/assets/imgs/comex.png" alt="imagem-comex">
    </div>
    <div class="addres-contact">
        <address>Endereço: Rua tal, nº 50</address>
        <div>Contato: <br> (11)99999-9999 <br> (11)99999-9999</div>
    </div>
    <ul class="navbar-dark d-flex">
        <li class="nav-item pe-3">
            <a class="nav-link active" aria-current="page" href="#">
                <Tweter />
            </a>
        </li>
        <li class="nav-item pe-3">
            <a class="nav-link active" aria-current="page" href="#">
                <Instagram />
            </a>
        </li>
        <li class="nav-item pe-3">
            <a class="nav-link active" aria-current="page" href="#">
                <img src="@/assets/imgs/icons/linkedin.png">
            </a>
        </li>
    </ul>
</template>
