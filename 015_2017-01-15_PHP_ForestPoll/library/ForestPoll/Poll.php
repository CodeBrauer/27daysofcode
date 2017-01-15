<?php

namespace ForestPoll;

/**
* Main Class
*/
class Poll
{
    public function __construct($db) {
        $this->db = $db;
    }

    public function savePoll($fields)
    {
        $poll = $this->db->insert('polls', [
            'title'            => $fields['question'],
            'multiple_answers' => (int)isset($fields['multiple_answers']),
        ]);
        foreach ($fields['options'] as $key => $answer) {
            if (empty($answer)) {
                continue;
            }
            $this->db->insert('answers', [
                'poll'  => $poll,
                'title' => $answer,
            ]);
        }
        if (empty($this->db->error()[1])) {
            return $poll;
        }
        return false;
    }

    public function find($id)
    {
        $data = $this->db->select('polls', [
            '[>]answers' => ['id' => 'poll'],
        ],[
            'polls.title',
            'polls.multiple_answers',
            'answers.title(answer)',
            'answers.id(answer_id)',
        ], [
            'polls.id' => $id,
        ]);
        if (empty($data)) {
            return false;
        }
        return $data;
    }

    public function saveEntries($poll, $entries)
    {
        if (isset($_COOKIE['Poll-' . $poll])) {
            return false;
        }
        foreach ($entries as $entry) {
            $this->db->insert('entries', [
                'poll'   => $poll,
                'answer' => $entry,
            ]);
        }
        if (empty($this->db->error()[1])) {
            setcookie(
                'Poll-' . $poll,
                time(),
                time() + (10 * 365 * 24 * 60 * 60)
            );
            return true;
        }
        return false;
    }

    public function getEntries($id)
    {
        $data['title']   = $this->db->get('polls', 'title', ['id' => $id]);
        $data['singleEntries'] = $this->db->select('entries', [
            '[>]answers' => ['answer' => 'id'],
        ],[
            'entries.answer',
            'answers.title',
            'entries.created',
        ], [
            'entries.poll' => $id
        ]);
        $data['calcEntries'] = $this->db->query("SELECT count(entries.answer) AS count, answers.title
            FROM entries
            LEFT JOIN answers
            ON entries.answer = answers.id
            WHERE entries.poll = '$id'
            GROUP BY entries.answer")
        ->fetchAll(\PDO::FETCH_ASSOC);

        return $data;
    }
}