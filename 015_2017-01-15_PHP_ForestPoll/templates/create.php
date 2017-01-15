{{ include('_header.php') }}
<main>
    <form action="/" method="post">
        <div class="group">
            <label for="question">Question:</label>
            <input type="text" name="question" id="question" maxlength="255" required>
        </div>
        <div class="group">
            <label for="op1">Option 1:</label>
            <input type="text" name="options[]" id="op1" maxlength="255" required>
        </div>
        <div class="group">
            <label for="op2">Option 2:</label>
            <input type="text" name="options[]" id="op2" maxlength="255" required>
        </div>
        <div class="more-answers"></div>
        <div class="more">
            <i class="icon-plus" title="Create one more option"></i>
        </div>

        <div class="group checkbox">
            <input type="checkbox" name="multiple_answers" id="multiple_answers">
            <label for="multiple_answers"> Allow multiple answers </label>
        </div>
        <input type="submit" value="Create poll">
    </form>
</main>
{{ include('_footer.php') }}