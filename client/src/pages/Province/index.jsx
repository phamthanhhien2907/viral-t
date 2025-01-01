import axios from "axios";

const Province = () => {
  // const api = `https://esgoo.net/api-tinhthanh/4/0.htm`;
  var citis = document.getElementById("city");
  var district = document.getElementById("district");
  var ward = document.getElementById("ward");
  var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
  };
  var promise = axios(Parameter);
  promise.then(function (result) {
    renderCity(result?.data);
  });

  function renderCity(data) {
    for (const x of data) {
      citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
    citis.onchange = function () {
      district.length = 1;
      ward.length = 1;
      if (this.value != "") {
        const result = data.filter((n) => n.Id === this.value);

        for (const k of result[0].Districts) {
          district.options[district.options.length] = new Option(k.Name, k.Id);
        }
      }
    };
    district.onchange = function () {
      ward.length = 1;
      const dataCity = data.filter((n) => n.Id === citis.value);
      if (this.value != "") {
        const dataWards = dataCity[0].Districts.filter(
          (n) => n.Id === this.value
        )[0].Wards;

        for (const w of dataWards) {
          ward.options[ward?.options?.length] = new Option(w.Name, w.Id);
        }
      }
    };
  }
  return (
    <div>
      <select id="city">
        <option value="" selected>
          Chọn tỉnh thành
        </option>
      </select>

      <select id="district">
        <option value="" selected>
          Chọn quận huyện
        </option>
      </select>

      <select id="ward">
        <option value="" selected>
          Chọn phường xã
        </option>
      </select>
    </div>
  );
};

export default Province;
