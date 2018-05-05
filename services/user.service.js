(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService',Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;
        service.GetByUaP=GetByUaP;
        service.GetAcessLevel=GetAcessLevel;

        return service;

        //função responsavel por retornar todos os usuarios
        function GetAll() {
            return getUsers();
        }

        //função responsavel por retornar um usario segundo o seu id

        function GetById(id) {
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            
            return user;
        }

         function GetByUaP(username,password) {
            var result = false;
            
            var users = getUsers();
             for (var i = 0; i < users.length; i++) {
                     if (users[i].username === username && 
                         users[i].password === password
                        ) {
                        result = true;

                        break;
                    }
                }
              
            return result;
        }

        function GetAcessLevel(username,password) { 
            var result=null;     
            var users = getUsers();
             for (var i = 0; i < users.length; i++) {
                     if (users[i].username === username && 
                         users[i].password === password
                        ) {
                        result =users[i].acesslevel;            

                        break;
                    }
                }
              
            return result;
        }


        function Save(user) {
            var users = getUsers();

            if (user.id) {
                // Actualizando um produto existente
                
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id === user.id) {
                        users[i] = user;
                        break;
                    }
                }
                setUsers (users);
            } else {
                // criando um novo produto
                
                // atribuindo o id
                var lastUser = users[users.length - 1] || { id: 0 };
                user.id = lastUser.id + 1;
    
                // salvando no armazenamento local
                users.push(user);
                setUsers(users);




                
            }

            return;
        }

         //função para eliminar um produto
        function Delete(id) {
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            
            return;
        }

        // função privada

        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();