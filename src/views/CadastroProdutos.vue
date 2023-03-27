<script setup lang="ts">
import { criarProduto } from '@/models/Produto.js';
import produtosService from '@/services/produtos.service'

let produto = {
  nome: '',
  descricao: '',
  preco: null,
  quantidade_estoque: null,
  categoria: '',
  url: null
}

async function salvaProduto(produto: any) {
    const newProduto = criarProduto(
        produto.nome,
        produto.descricao,
        Number(produto.preco),
        Number(produto.quantidade_estoque),
        produto.categoria,
        produto.url
    )
    await produtosService.insertProdutos(newProduto)
}
</script>

<template>
    <section>
        <form id="formProdutos" class="container" @submit.prevent="salvaProduto(produto)">
            <h2 class="text-center mt-5 mb-4">Novo produto</h2>
            <div class="row">
                <div class="col-3">
                    <label for="nome" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="nome" v-model="produto.nome" name="nome">
                </div>
                <div class="col-3">
                    <label for="url" class="form-label">Url:</label>
                    <input type="text" class="form-control" id="url" v-model="produto.url" name="url">
                </div>
                <div class="col-3">
                    <label for="preco" class="form-label">Preço:</label>
                    <input type="text" class="form-control" id="preco" v-model="produto.preco" name="preco"
                        pattern='[0-9]+(\\.[0-9][0-9]?)?' title="Digite somente números">
                </div>
                <div class="col-3">
                    <label for="quantidade" class="form-label">Quantidade em estoque:</label>
                    <input type="text" class="form-control" id="quantidade" v-model="produto.quantidade_estoque"
                        name="quantidade" pattern='[0-9]+(\\.[0-9][0-9]?)?' title="Digite somente números">
                </div>
            </div>
            <div class="row">
                <div class="col-9">
                    <label for="descricao" class="form-label">Descrição:</label>
                    <textarea rows="4" class="form-control" id="descricao" v-model="produto.descricao"
                        name="descricao"></textarea>
                </div>
                <div class="col-3">
                    <label for="categoria" class="form-label">Categoria:</label>
                    <select id="categoria" v-model="produto.categoria" name="categoria" class="form-select"
                        aria-label="Default select example">
                        <option hidden>Selecione...</option>
                        <option value="1">Informática</option>
                        <option value="2">Livros</option>
                        <option value="3">Móveis</option>
                    </select>
                </div>
            </div>
            <div class="row text-center mt-5">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary pe-5 px-5">Salvar</button>
                </div>
            </div>
        </form>
    </section>
</template>
