function saveOptions(e) {
    e.preventDefault();
    var dm;
    if (document.querySelector("#dm_off")   .checked) dm = "off"   ;
    if (document.querySelector("#dm_auto")  .checked) dm = "auto"  ;
    if (document.querySelector("#dm_always").checked) dm = "always";
    let sp = document.querySelector("#sp_switch").checked;
    browser.storage.sync.set({
        darkmode: dm,
        subpixel: sp,
    });
  }
  
  function restoreOptions() {
    function setSubpixelChoice(result) {
      document.querySelector("#sp_switch").checked = result.subpixel == null ? true : result.subpixel;
    }
  
    function setDarkmodeChoice(result) {
        let dm = result.darkmode || "auto";
        document.querySelector("#dm_off")   .checked = dm == "off"   ;
        document.querySelector("#dm_auto")  .checked = dm == "auto"  ;
        document.querySelector("#dm_always").checked = dm == "always";
    }

    function onError(error) {
      console.log(`BDD Options Error: ${error}`);
    }
  
    let spgetting = browser.storage.sync.get("subpixel");
    spgetting.then(setSubpixelChoice, onError);

    let dmgetting = browser.storage.sync.get("darkmode");
    dmgetting.then(setDarkmodeChoice, onError);
  }
  restoreOptions();
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("change", saveOptions);
  