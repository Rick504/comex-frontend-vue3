<script setup lang="ts">
import { useCarrinhoStore } from '@/stores/carrinho.js'

const carrinhoStore = useCarrinhoStore()
const produtos = carrinhoStore.produtos

</script>

<template>
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in produtos" :key="index">
                    <td>{{item.nome}}</td>
                    <td>{{item.descricao}}</td>
                    <td>{{item.preco}}</td>
                </tr>
                <tr>
                    <td colspan="4" class="text-end">Total: {{ carrinhoStore.precoTotal }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
