<script setup lang="ts">
    import type { Categoria } from '@/interfaces/index';
    import { criarCategoria } from '@/models/Categoria.js';
    import IconDelete from '@/views/components/IconDelete.vue'
    import { onMounted, ref } from 'vue'
    import categoriasService from '@/services/categorias.service'

    const listaCategorias = ref<Categoria[]>([])
    let nomeCategoria = ''

    async function getCategorias() {
        const categorias = await categoriasService.getCategorias()
        listaCategorias.value = categorias
    }

    async function inserirCategoria(nome: string) {
        nomeCategoria = ''
        await categoriasService.insertCategorias(criarCategoria(nome))
        await getCategorias()
        // listaCategorias.value.push(criarCategoria(nome))
    }

    async function excluirCategoria(id: string) {
        await categoriasService.deleteCategorias(id)
        await getCategorias()
        // let novaLista = listaCategorias.value.filter(objeto => objeto.id !== id)
        // listaCategorias.value= novaLista
    }

    onMounted(() => {
        getCategorias()
    })
</script>

<template>
    <section class="container">
        <div class="row">
            <div class="col-12 d-flex justify-content-center mt-5">
                <h2>Nova categoria</h2>
            </div>
        </div>
        <div class="row">
            <form id="formCategoria" class="offset-3 col-6 d-flex justify-content-center mt-3"
                @submit.prevent="inserirCategoria(nomeCategoria)">
                <input id="nome" class="form-control border-1 rounded"
                    placeholder="Informe o nome da nova categoria com pelo menos 2 letras..." v-model="nomeCategoria"
                    type="text">
                <button type="submit" id="salvar-categoria" class="btn btn-primary">Salvar</button>
            </form>
        </div>
    </section>

    <section class="container d-flex justify-content-center mt-4">
        <table class="table w-75">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Status</th>
                    <th scope="col">Data de criação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listaCategorias.length === 0">
                    <td class="text-center" colspan="4">Não tem nenhum item</td>
                </tr>
                <tr v-else v-for="(item, index) in listaCategorias" :key="index">
                    <td>{{item.nome}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.criacao}}</td>
                    <td>
                        <button class="btn border border-1" @click="excluirCategoria(item.id)">
                            <IconDelete />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <div class="erro-listar-categorias text-center"></div>
</template>
