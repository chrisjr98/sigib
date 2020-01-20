const pathPrincipal = '../backend/backend-juego-bolsa/views';
const usuarioEjs = `<script>
      const username = '<%= user.username %>';
      const user_id = '<%= user.id %>';
      const email = '<%= user.email %>';
      const email_verified = '<%= user.email_verified %>';
      const datosEmpresa = '<%- JSON.stringify(user.datosEmpresa,) %>';
  </script>`;
module.exports = {
  prod:{
    usuario: usuarioEjs,
    directorio: pathPrincipal + '/user.ejs'
  },
  preProd:{
    usuario: usuarioEjs,
    directorio: pathPrincipal + '/user.ejs'
  },
  test:{
    usuario: usuarioEjs,
    directorio: pathPrincipal + '/user.ejs'
  },
  dev:{
    usuario: usuarioEjs,
    directorio: pathPrincipal + '/user-dev.ejs'
  },

};
