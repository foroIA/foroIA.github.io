import dash
from dash import dcc
from dash import html
import plotly.express as px
import pandas as pd

import utils


app = dash.Dash(__name__)

ah = utils.APIBMEHandler()

san_data = ah.get_close_data_ticker(market='IBEX', ticker='SAN')
fig = px.line(san_data)

app.layout = html.Div(
    children=[
        html.H1('MIAX Data EXPLORER'),
        html.P('mIAx API'),
        dcc.Dropdown(
            id='menu-index',
            options=[
                {'label': 'IBEX', 'value': 'IBEX'},
                {'label': 'DAX', 'value': 'DAX'},
                {'label': 'EUROSTOXX', 'value': 'EUROSTOXX'},
            ],
            value='IBEX'
        ),
        dcc.Dropdown(
            id='menu-ticker',
            options=[
                {'label': 'SAN', 'value': 'SAN'},
            ],
            value='SAN'
        ),
        dcc.Graph(
            id='example-graph',
            figure=fig
        )
    ]
)

if __name__ == '__main__':
    app.run(debug=True)