<?php
	function load($input) {
		$input = json_decode($input);
		$file_name = $input -> name;
		$content = file_get_contents($file_name);
		return $content;
	}

	$input = file_get_contents('php://input');
	echo load($input);
?>
