{{ include('_header.php') }}
<main>
    <h1>{{ title }}: {{ data.title }}</h1>
    <h2>Bar chart</h2>
    {% for entry in data.calcEntries %}
        <div class="bar" data-entries="{{ entry.count }}" data-count="{{ data.singleEntries|length }}">({{ entry.count }}) {{ entry.title }}</div>
    {% endfor %}

    <h2>Single answers</h2>
    <ul>
        {% for entry in data.singleEntries %}
            <li>{{ entry.created }}: {{ entry.title }}</li>
        {% endfor %}
    </ul>
</main>
{{ include('_footer.php') }}