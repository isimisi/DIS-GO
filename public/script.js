$(document).ready(async function () {
   if ($('#list').hasClass('active')) {
      const { data } = await axios.get('http://localhost:8080/hosts');
      const content = [
         `<h5 class="card-title">List of hosts with their average RTT</h5>`,
         `<ul class="list-group">`,
      ];
      data.forEach((element) => {
         content.push(
            `<li class="list-group-item"> host: ${element.host} RTT: ${element.ping}</li>`
         );
      });
      content.push('</ul>');

      const output = content.join('');

      $('.content').html(output);
   } else {
      $('#frontend').click(async function (e) {
         e.preventDefault();
         await requestRTT('134.122.73.248');
      });

      $('#backend').click(async function (e) {
         e.preventDefault();
         await requestRTT('159.89.8.171');
      });

      $('#basic-url').on('keypress', async function (event) {
         if (event.which === 13) {
            event.preventDefault();
            $('.dropdown').dropdown('toggle');

            await requestRTT(this.value);
            this.value = '';
         }
      });

      $('#dropdown-btn').click(function (e) {
         if ($(this).hasClass('btn-outline-danger')) {
            $('#dropdown-btn').removeClass('btn-outline-danger');
            $('#dropdown-btn').addClass('btn-secondary');
            $('.card-body').find('div:last').remove();
         }
      });
   }
   $('#list').click(async function () {
      if ($(this).hasClass('active')) return;

      if (location.hostname === '127.0.0.1') {
         location.href = `list.html`;
      } else {
         location.href = `list`;
      }
   });

   $('#pinger').click(function () {
      if ($(this).hasClass('active')) return;

      if (location.hostname === '127.0.0.1') {
         location.href = `index.html`;
      } else {
         location.href = `/`;
      }
   });

   async function requestRTT(host) {
      try {
         const spinner = `<div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
       </div>`;
         $('.output').html(spinner);

         const url = `http://localhost:8080/ping?host=${host}`;
         const { data } = await axios.get(url);
         const output = `<ul class="list-group list-group-flush">
         <li class="list-group-item">Host: ${data.host}</li>
         <li class="list-group-item">RTT: ${
            Math.round(data.averageRTT * 100) / 100
         }ms</li>
      </ul>`;

         $('.output').html(output);
      } catch (error) {
         $('#dropdown-btn').removeClass('btn-secondary');
         $('#dropdown-btn').addClass('btn-outline-danger');
         const errorMessage = `<div class="invalid">
         ${error.response.data}
       </div>`;

         $('.card-body').append(errorMessage);
         $('.output').html('');
      }
   }
});
