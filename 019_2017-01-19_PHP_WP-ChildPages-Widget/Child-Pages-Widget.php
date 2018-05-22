<?php
/*
Plugin Name: Child Pages Widget
Plugin URI:  https://github.com/CodeBrauer/27daysofcode
Description: Displays the child pages of current page
Version:     1.0
Author:      CodeBrauer
Author URI:  https://github.com/CodeBrauer
License:     MIT
License URI: https://opensource.org/licenses/MIT
*/

class ChildPagesWidget extends WP_Widget {

    public function __construct() {
        $widget_ops = [
            'classname'   => 'child-pages',
            'description' => 'Displays the child pages of current page',
        ];
        parent::__construct( 'ChildPagesWidget', 'Child Pages', $widget_ops );
    }

    public function widget( $args, $instance ) {
        $html =  $args['before_widget'] . '<ul class="wcp-menu">';
        $queried_object = get_queried_object();

        if ($queried_object) {
            $post_id = $queried_object->ID;

            $gc_args = [
                'post_parent' => $post_id,
                'post_type'   => 'page', 
                'numberposts' => -1,
                'post_status' => 'publish' 
            ];

            $children = get_children($gc_args);
            foreach ($children as $key => $page) {
                $html .= '<li class="wcp-item"><a href="' . get_permalink($page->ID) . '">' . $page->post_title . '</a></li>';
            }
            $html .= '</ul>' . $args['after_widget'];
            if ($children) {
                echo $html;
            }
        }
    }
}

add_action( 'widgets_init', function() {
    register_widget( 'ChildPagesWidget' );
});