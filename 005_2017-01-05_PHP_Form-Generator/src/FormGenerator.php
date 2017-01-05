<?php

/**
* Class FormGenerator
* @author CodeBrauer <https://github.com/CodeBrauer>
* @version 1.0-alpha
*/
class FormGenerator {

    const ID_PREFIX = 'FG_';

    public $newline = PHP_EOL;

    protected $formHTML;
    private $lastElement;

    public function __construct(array $attributes)
    {
        $this->lastElement = false;
        $this->formHTML    = '<form ';

        foreach ($attributes as $attr => $value) {
            $this->formHTML .= $this->formatAttribute($attr, $value);
        }

        $this->formHTML = rtrim($this->formHTML) . '>' . $this->newline;

        return $this;
    }

    public function generate(bool $print = true)
    {
        $this->lastElement = false;
        $this->formHTML .= '</form>';
        if (!$print) {
            return $this->formHTML;
        }
        echo $this->formHTML . $this->newline;
    }

    public function input(string $type, string $name, array $attributes = [])
    {
        $input = sprintf('<input type="%s" name="%s" id="%s" ', $type, $name, $this->formatID($name));
        foreach ($attributes as $attr => $value) {
            $input .= $this->formatAttribute($attr, $value);
        }
        $input = rtrim($input) . '>';

        $this->formHTML .= $this->lastElement = $input;

        return $this;
    }

    public function textarea(string $name, array $attributes = [], string $value = '')
    {
        $attrHTML = '';
        foreach ($attributes as $attr => $attrValue) {
            $attrHTML .= $this->formatAttribute($attr, $attrValue);
        }
        $textarea = sprintf('<textarea name="%s" id="%s" %s>%s</textarea>', $name, $this->formatID($name), trim($attrHTML), $value);
        $this->formHTML .= $this->lastElement = $textarea;
        return $this;
    }

    public function select(string $name, array $options, bool $multiple = false, array $attributes = [])
    {
        $multiple    = ($multiple ? 'multiple' : '');
        $attrHTML    = '';
        $optionsHTML = '';
        foreach ($attributes as $attr => $attrValue) {
            $attrHTML .= $this->formatAttribute($attr, $attrValue);
        }
        foreach ($options as $value => $option) {
            $optionsHTML .= sprintf('<option value="%s">%s</option>', $value, $option);
        }
        $select = sprintf('<select name="%s" id="%s" %s %s>%s</select>', $name, $this->formatID($name), $multiple, $attrHTML, $optionsHTML);
        $this->formHTML .= $this->lastElement = $select;
        return $this;
    }

    public function withLabel(string $label)
    {
        return $this->withWrap('<label>' . htmlspecialchars($label), '</label>');
    }

    public function withWrap(string $element, string $closingElement)
    {
        if ($this->lastElement === false) {
            throw new Exception("Can not add label to non-element.", 1);
        }

        $label          = $element . $this->lastElement . $closingElement;
        $this->formHTML = str_replace($this->lastElement, $label, $this->formHTML) . $this->newline;

        return $this;
    }

    public function rawHTML(string $html)
    {
        $this->formHTML .= $html;
        return $this;   
    }

    protected function formatAttribute(string $attr, string $val, bool $leadingSpace = true) {
        if (is_numeric($attr)) {
            return $val . ($leadingSpace ? ' ' : '');
        }
        return $attr . '="' . $val . '"' . ($leadingSpace ? ' ' : '');
    }

    protected function formatID(string $name) {
        return self::ID_PREFIX . $name . '_' . substr(spl_object_hash($this), -2);
    }
}