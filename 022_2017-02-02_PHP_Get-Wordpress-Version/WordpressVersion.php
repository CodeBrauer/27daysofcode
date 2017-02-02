<?php
/**
*  Get WP Version by URL
*/
class WordpressVersion
{

    public static function get($url)
    {
        $source = self::getSource($url);
        if ($source === false) {
            echo trim($url) . ' is not reachable...' . PHP_EOL;
            return false;
        }
        if (!self::isWordPress($source)) {
            echo trim($url) . ' is not a wordpress page...' . PHP_EOL;
            return false;
        }

        // find generator version leak
        $generator = preg_grep("/name=\"generator\" content=\"WordPress/i", explode("\n", $source));
        if (!empty($generator)) {
            preg_match("/\d+(\.\d+(\.\d+)?)?/i", array_values($generator)[0], $out);
            if (isset($out[0])) {
                return trim($out[0]);
            }
        }
        
        // find wpincludes version leak
        preg_match_all("/wp-embed.min.js\?ver=\d+\.\d+(\.\d+)?/i", $source, $uris);
        if (!empty($uris[0]) && isset($uris[0][0])) {
            list($crap, $version) = explode('=', $uris[0][0]);
            return trim($version);
        }

        // grab the feed version
        $feedsource    = self::getSource($url . '/feed/');
        $feedgenerator = preg_grep("/<generator>/i", explode("\n", $feedsource));
        if (!empty($feedgenerator)) {
            preg_match("/\d+(\.\d+(\.\d+)?)?/i", array_values($generator)[0], $out);
            if (isset($out[0])) {
                return trim($out[0]);
            }
        }

        echo trim($url). " has an unknown version...";
    }

    public static function isWordPress($src)
    {
        if ((strpos($src, 'wp-content/') !== false) || (strpos($src, 'wp-includes/') !== false)) {
            return true;
        }
        return false;
    }

    public static function getSource($url)
    {
        if (!function_exists('curl_init')) { return file_get_contents($url); } // fallback
        $ch = curl_init();
        $options = [
            CURLOPT_URL            => $url,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => false,
            CURLOPT_FOLLOWLOCATION => true,
        ];
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        if ($response === false) {
            return false;
        }
        curl_close($ch);
        return $response;
    }
}