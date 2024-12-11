import json
from bs4 import BeautifulSoup

with open('./db/seeds/data/StationsRefData_v1.2.xml', 'r') as file:
    data = file.read()

soup = BeautifulSoup(data, features="xml")

stations = soup.find_all('Station')

data = []

for station in stations:
    if station.CRS.text != '' and station.Nlc.text != ' ':

        if station.OJPDisplayName.text != '':
            name = station.OJPDisplayName.text
        else:
            name = station.Name.text
        data.append({
            'station': name,
            'crs': station.CRS.text,
            'nlc': station.Nlc.text
        })

unique = list({v['crs']: v for v in data}.values())

with open('./db/seeds/data/crs.json', 'w') as file:
    file.write(json.dumps(unique))
"""
    
    	<Station>
		<Nlc>5399</Nlc>
		<Name>Balham</Name>
		<Tiploc>BALHAM</Tiploc>
		<CRS>BAL</CRS>
		<OJPEnabled>true</OJPEnabled>
		<DarwinEnabled>true</DarwinEnabled>
		<KBEnabled>true</KBEnabled>
		<OJPDisplayName />
		<OJPAdviceMessage />
		<RSPDisplayName />
		<AttendedTIS>true</AttendedTIS>
		<UnattendedTIS>true</UnattendedTIS>
	</Station>
		<Station>
		<Nlc>0054</Nlc>
		<Name>London Zone 4*</Name>
		<Tiploc />
		<CRS>44A</CRS>
		<OJPEnabled>false</OJPEnabled>
		<DarwinEnabled>false</DarwinEnabled>
		<KBEnabled>false</KBEnabled>
		<OJPDisplayName />
		<OJPAdviceMessage />
		<RSPDisplayName />
		<AttendedTIS>true</AttendedTIS>
		<UnattendedTIS>true</UnattendedTIS>
	</Station>
    """
