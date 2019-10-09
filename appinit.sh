#!/bin/bash
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate

importado="db/.importado"

if [ -f "$importado" ]
then
		echo "Carga inicial de dados ja efetuada, continuando..."
else
		echo "Carga inicial de dados sendo efetuada, aguarde, pode demorar um pouco..."
		python manage.py loaddata db/dados_iniciais.json
		echo 'ok' > db/.importado
fi
python manage.py runserver 0.0.0.0:8000