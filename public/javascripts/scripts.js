$(document).ready(function() {
	$(".list-group-item a.pull-left").click(function() {
		var oldval = $(this).next().val();
		if (oldval > 0) {
			$(this).next().val(oldval-1);
		}
	});
	$(".list-group-item a.pull-right").click(function() {
		var oldval2 = $(this).prev().val();
		oldval2 = parseInt(oldval2);
		$(this).prev().val(oldval2+1);
	});
});