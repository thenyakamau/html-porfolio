document.querySelector("#btn-game").addEventListener("click", (e) => {
  function openModal() {
    //Get Modal Element
    const modal = document.getElementById("simpleModal");

    modal.style.display = "block";
  }

  openModal();
});
document.querySelector("#closeBtn").addEventListener("click", (e) => {
  function closeModal() {
    const modal = document.getElementById("simpleModal");
    modal.style.display = "none";
  }
  closeModal();
});
window.addEventListener("click", (e) => {
  function outsideClick(e) {
    const modal = document.getElementById("simpleModal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
  outsideClick(e);
});
