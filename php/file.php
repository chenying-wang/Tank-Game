<?php
	const FILE_NAME = 'nn_factors.json';

	function load() {
		echo file_get_contents(FILE_NAME);
	}

	function save($input) {
		file_put_contents(FILE_NAME, $input);
	}

	$input = file_get_contents('php://input');
	if($input == '_GET_') {
		load();
	} else {
		save($input);
	}
?>
