<?php
	function save($input) {
		$input = json_decode($input);
		$file_name = $input -> name;
		unset($input -> name);
		$status = file_put_contents($file_name, json_encode($input));
		return $status;
	}

	$input = file_get_contents('php://input');
	echo save($input);
?>
