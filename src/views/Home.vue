<script setup lang="ts">
import { onMounted, ref } from 'vue'
import produtosService from '@/services/produtos.service'
import type { Produto } from '@/interfaces/index'
import { useCarrinhoStore } from '@/stores/carrinho.js'

const carrinhoStore = useCarrinhoStore()

let listaProdutos = ref<Produto[]>([])

async function getProdutos() {
    const produtos = await produtosService.getProdutos()
    listaProdutos.value = produtos
}

onMounted(() => {
    getProdutos()
})

function verifyUrl(item: Produto) {
    if (item && item.url) {
        return item.url
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/498px-Item_sem_imagem.svg.png'
}
</script>

<template>
    <main class="mt-5 container">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="@/assets/imgs/banner-img.png" class="d-block w-100" alt="banner">
                </div>
                <div class="carousel-item">
                    <img src="@/assets/imgs/banner-img.png" class="d-block w-100" alt="banner">
                </div>
                <div class="carousel-item">
                    <img src="@/assets/imgs/banner-img.png" class="d-block w-100" alt="banner">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon carousel-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon carousel-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </main>

    <section class="container">
        <div class="tittle-banners">
            <img class="pe-3" src="@/assets/imgs/icons/estrela.png">
            <h2>Produtos mais vendidos</h2>
        </div>
        <div class="purchase mt-5">
            <div class="purchase-item" v-for="(item, index) in listaProdutos" :key="index">
                <div class="ms-5 mt-3">
                    <img class="imgs-purchase mb-4" :src="verifyUrl(item)">
                    <p>Nome: {{item.nome}}<br>
                        Preço: {{item.preco}}</p>
                    <button class="btn-purchase mt-3 mb-3 p-2"
                        @click="carrinhoStore.incrementProduto(item)">Comprar</button>
                </div>
            </div>
        </div>
    </section>
</template>
