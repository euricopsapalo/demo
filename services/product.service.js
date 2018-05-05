(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

        //função responsavel por retornar todos os produtos
        function GetAll() {
            return getProducts();
        }

        //função responsavel por retornar um produto segundo o seu id

        function GetById(id) {
            var filtered = $filter('filter')(getProducts(), { id: id });
            var product = filtered.length ? filtered[0] : null;
            
            return product;
        }

        function Save(product) {
            var products = getProducts();

            if (product.id) {
                // Actualizando um produto existente
                
                for (var i = 0; i < products.length; i++) {
                    if (products[i].id === product.id) {
                        products[i] = product;
                        break;
                    }
                }
                setProducts(products);
            } else {
                // criando um novo produto
                
                /*obtendo o id  do ultimo produto caso já tenha algum,
                  caso contrario atribui se  0 a variavel lasproduct e 
                  depois adiciona-se 1 ao valor da variavel lasproduct
                  e cria-se o id do novo produto a ser criado
                */
                var lastProduct = products[products.length - 1] || { id: 0 };
               // console.log(lastProduct.id);

                product.id = lastProduct.id + 1;

    
                /* salvando o objecto do novo produto na lista de objectos
                 existente
                */
                products.push(product);
                //salvando a lista de objectos no localstorage
                setProducts(products);
            }

            return;
        }

         //função para eliminar um produto
        function Delete(id) {
            var products = getProducts();
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                if (product.id === id) {
                    products.splice(i, 1);
                    break;
                }
            }
            setProducts(products);
            
            return;
        }

        // função privada

        //função que retorna a lista produtos armazenados localmente
        function getProducts() {
            if (!localStorage.products) {
                localStorage.products = JSON.stringify([]);
            }

            return JSON.parse(localStorage.products);
        }

       //função que salva uma  lista produtos  localmente
        function setProducts(products) {
            localStorage.products = JSON.stringify(products);
        }
    }
})();