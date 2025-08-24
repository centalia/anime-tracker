<div class="modal hidden">
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="text">Добавление тайтла</h3>
            <button class="close-modal">&times;</button>
        </div>
    <div class="add-anime-form text">
            <div class="add-anime-form-input">
            <p class="text">Название тайтла: </p><input type="text" id="anime-title" placeholder="Название тайтла">
            </div>
        <div class="add-anime-form-input">
            <p class="text">Кол-во эпизодов: </p><input type="number" id="anime-episodes" placeholder="Всего эпизодов">
        </div>
        <p class="text">Статус просмотра: <select id="anime-status">
            <option value="watching">Смотрю</option>
            <option value="completed">Просмотрено</option>
            <option value="on_hold">Отложено</option>
            <option value="dropped">Брошено</option>
            <option value="plan_to_watch">В планах</option>
        </select></p>
            <div class="modal-footer">
                <button type="button" onclick="addAnimeFromForm()">Добавить</button>
            </div>
    </div>
    </div>
</div>
<div class="overlay hidden"></div>