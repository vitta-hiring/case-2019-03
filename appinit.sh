#!/bin/bash
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate

importado="db/.importado"
dadosiniciais="db/dados_iniciais.json"

if [ -f "$importado" ]
then
		echo "Carga inicial de dados ja efetuada, continuando..."
else
		echo "Carga inicial de dados sendo efetuada, aguarde, pode demorar um pouco..."
		tar -zxvf db/dados_iniciais.tar.gz -C db/

		if [ -f "$dadosiniciais" ]
		then
		    python manage.py loaddata db/dados_iniciais.json
		    echo 'ok' > db/.importado
		    rm -f db/dados_iniciais.json
		else
		    echo "Arquivo de dados iniciais nao localizado."
		fi
fi

python manage.py runserver 0.0.0.0:8000