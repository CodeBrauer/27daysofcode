{{ include('_header.php') }}
<main>
    {% if answered %}
        <p style="text-align:center">
            You have already voted in this poll. ({{ answered|date('Y-m-d H:i') }})
            <br>
            <a href="/{{ id }}/r">See results</a>
        </p>

    {% else %}
        <h1>{{ data[0].title }}</h1>
        <form action="" method="post">
            {% for answer in data %}
                <div class="group checkbox">
                    <input type="{{ answer.multiple_answers ? 'checkbox' : 'radio' }}" name="answer[]" value="{{ answer.answer_id }}" id="answer{{ answer.answer_id }}">
                    <label for="answer{{ answer.answer_id }}"> {{ answer.answer }} </label>
                </div>
            {% endfor %}
            <input type="submit" value="Answer this poll">
        </form>
    {% endif %}
</main>
{{ include('_footer.php') }}