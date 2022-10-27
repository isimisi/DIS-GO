$('#frontend').click(async function () {
   await requestRTT('134.122.73.248');
});
$('#backend').click(async function () {
   await requestRTT('159.89.8.171');
});

async function requestRTT(host) {
   try {
      const url = `http://localhost:8080/ping?host=${host}`;
      const { data } = await axios.get(url);
      console.log(data);
   } catch (error) {
      console.log(error);
   }
}
