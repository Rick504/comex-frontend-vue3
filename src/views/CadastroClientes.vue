<script setup lang="ts">
import { criarCliente } from '@/models/Cliente.js';
import clientesService from '@/services/clientes.service'
import { ref } from 'vue';
import type { Endereco } from '@/interfaces/index'
import type { Ref } from 'vue';

const inputNome: Ref<HTMLInputElement | null> = ref(null);
const inputSobrenome: Ref<HTMLInputElement | null> = ref(null);
const inputEmail: Ref<HTMLInputElement | null> = ref(null);
const inputTelefone: Ref<HTMLInputElement | null> = ref(null);
const inputCpf: Ref<HTMLInputElement | null> = ref(null);
const inputCep: Ref<HTMLInputElement | null> = ref(null);

const logradouro: Ref<HTMLInputElement | null> = ref(null);
const numero: Ref<HTMLInputElement | null> = ref(null);
const complemento: Ref<HTMLInputElement | null> = ref(null);
const uf: Ref<HTMLInputElement | null> = ref(null);
const bairro: Ref<HTMLInputElement | null> = ref(null);
const localidade: Ref<HTMLInputElement | null> = ref(null);

const erroCpf: Ref<boolean> = ref(false);

function validarCpf(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos

        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        let iguais = true;
        for (let i = 1; i < 11 && iguais; i++) {
          if (cpf[i] !== cpf[0]) iguais = false;
        }
        if (iguais) return false;

        // Calcula os dígitos verificadores
        let soma = 0;
        let resto;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
}

async function searchAddress(): Promise<any> {
  try {
    const url = `https://viacep.com.br/ws/${inputCep.value}/json/`;

    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      throw new Error("Cep inválido!");
    }

    return data;
  } catch (error) {
    console.log('Erro ao tentar buscar o cep.');
    throw error;
  }
}

async function onblurCep() {
        try {
            let enderecoViaCep: any = await searchAddress()

            if (enderecoViaCep) {
                logradouro.value = enderecoViaCep.logradouro
                complemento.value = enderecoViaCep.complemento
                uf.value = enderecoViaCep.uf
                bairro.value = enderecoViaCep.bairro
                localidade.value = enderecoViaCep.localidade
            }
        } catch (err) {
            console.log(err)
        }
}

async function adicionarCliente() {
    let endereco = {
        rua: String(logradouro.value),
        numero: String(numero.value),
        bairro: String(bairro.value),
        cidade: String(localidade.value),
        estado: String(uf.value),
        cep: String(inputCep.value),
        complemento: String(complemento.value)
    }

    let novoCliente = criarCliente(
        String(inputNome.value),
        String(inputSobrenome.value),
        String(inputEmail.value),
        String(inputCpf.value),
        String(inputTelefone.value),
        endereco as Endereco
    )

    if (!validarCpf(String(inputCpf.value))){
        erroCpf.value = true;
      } else {
        erroCpf.value = false;
        await clientesService.insertClientes(novoCliente);
        console.log('Cliente salvo com sucesso')
      }

}

</script>

<template>
    <section class="offset-3 w-50">
        <h2 class="text-center mt-4 mb-4">Novo Cliente</h2>
        <form ref="formClientes" id="formClientes" class="container" @submit.prevent="adicionarCliente">
            <div class="row">
                <div class="col-6">
                    <label for="nome" class="form-label">Nome:</label>
                    <input v-model="inputNome" type="text" class="form-control" id="nome" minlength="2" required>
                </div>
                <div class="col-6">
                    <label for="sobrenome" class="form-label">Sobrenome:</label>
                    <input v-model="inputSobrenome" type="text" class="form-control" id="sobrenome" minlength="2" required>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <label for="email" class="form-label">Email:</label>
                    <input v-model="inputEmail" type="text" class="form-control" id="email"
                        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label for="cpf" class="form-label">Cpf:</label>
                    <input v-mask="'###.###.###-##'" v-model="inputCpf" type="text" class="form-control" id="cpf" required>
                    <span v-if="erroCpf" id="cpf-error" class="error-message text-danger">CPF inválido</span>
                </div>
                <div class="col-6">
                    <label for="telefone" class="form-label">Telefone:</label>
                    <input v-mask="'(##)#####-####'" v-model="inputTelefone" type="text" maxlength="14" class="form-control"
                        id="telefone">
                </div>
            </div>

            <div class="row">
                <h2 class="mt-3">Endereço: </h2>
                <div class="col-4">
                    <label for="cep" class="form-label">Cep:</label>
                    <input v-mask="'#####-###'" @blur="onblurCep" v-model="inputCep" type="text" class="form-control"
                        id="cep" required>
                </div>
                <div class="col-6">
                    <label for="logradouro" class="form-label">Rua:</label>
                    <input v-model="logradouro" type="text" class="form-control" id="logradouro" required>
                </div>
                <div class="col-2">
                    <label for="numero" class="form-label">Número:</label>
                    <input v-model="numero" type="text" class="form-control" id="numero">
                </div>
                <div class="col-6">
                    <label for="complemento" class="form-label">Complemento:</label>
                    <input v-model="complemento" type="text" class="form-control" id="complemento">

                </div>
                <div class="col-6">
                    <label for="uf" class="form-label">Estado:</label>
                    <input v-model="uf" type="text" class="form-control" id="uf" minlength="2" required>
                </div>
                <div class="col-6">
                    <label for="bairro" class="form-label">Bairro:</label>
                    <input v-model="bairro" type="text" class="form-control" id="bairro" required>
                </div>
                <div class="col-6">
                    <label for="localidade" class="form-label">Cidade:</label>
                    <input v-model="localidade" type="text" class="form-control" id="localidade" required>
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
