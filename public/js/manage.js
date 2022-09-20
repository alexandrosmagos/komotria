function deleteSomething(id) {
	fetch("/api/room/" + id, {
		method: "DELETE",
	});
	//remove item in list
	let item = document.getElementById(id);
	item.remove();
}
