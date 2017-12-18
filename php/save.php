<?php
	const ROOT = '../';

	function file_force_contents($dir, $contents){
        $parts = explode('/', $dir);
        $file = array_pop($parts);
        $dir = '';
        foreach($parts as $part)
            if(!is_dir($dir .= "$part/")) mkdir($dir);
        file_put_contents("$dir/$file", $contents);
    }

	function save($input) {
		$input = json_decode($input);
		$file_name = ROOT . $input -> name;
		unset($input -> name);
		$status = file_force_contents($file_name, json_encode($input));
		return $status;
	}

	$input = file_get_contents('php://input');
	//echo save($input);
?>
