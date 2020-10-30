<?php

	$fr = 'bjekt';
	$to = 'bject';

    for ($i = 0; $i < count($PHPData); ++$i) {
        if (is_array($PHPData[$i])) {
			for ($j = 0; $j < count($PHPData[$i]); ++$j) {
				if (is_array($PHPData[$i][$j])) {
					for ($k = 0; $k < count($PHPData[$i][$j]); ++$k) {
							$PHPData[$i][$j][$k] = str_replace($fr, $to, $PHPData[$i][$j][$k]);
					}
				} else {
					$PHPData[$i][$j] = str_replace($fr, $to, $PHPData[$i][$j]);
				}
			}
        } else {
	        $PHPData[$i] = str_replace($fr, $to, $PHPData[$i]);
        }
    }

?>