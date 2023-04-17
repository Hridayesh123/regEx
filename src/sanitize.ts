export function sanitizeData(content) {
   
    content = content.replace(/\+31\s?6(\d\s?){6}\d/g,  function(match) {  //number
        return '0'.repeat(match.length);
      }); 
      //console.log(content ,"num");
    
    content = content.replace(/^NL(\d{2})([A-Z]{4})(\d{10})$/g, function(match, p1, p2, p3){ //bank
        
       const n1='x'.repeat(p1.length);
        const n2='x'.repeat(p2.length);
        const n3='x'.repeat(p3.length);
        return 'NL' + n1 +n2 +n3;
    });
    //console.log(content ,"bank");
    
    content = content.replace(/^([1-9][0-9]{3}\s?[A-Z]{2})$/g, function(match) {  //postal 
        return 'x'.repeat(match.length);
      });
     // console.log(content ,"postal");
    
    content = content.replace(/([^@\s]+)@([^@\s]+\.)+(com)$/g, function(match, p1, p2, p3) {  //email
      p1= 'x'.repeat(p1.length);
      return p1 + '@' + p2 + p3;
      
    });

    //console.log(content ,"email");

    
    const address =["Aa en Hunze", "Aalsmeer", "Aalten", "Achtkarspelen", "Alblasserdam", "Albrandswaard", "Alkmaar", "Almelo", "Almere", "Alphen aan den Rijn", "Alphen-Chaam", "Ameland", "Amersfoort", "Amstelveen", "Amsterdam", "Apeldoorn", "Appingedam", "Arnhem", "Assen", "Asten", "Baarle-Nassau", "Baarn", "Barendrecht", "Barneveld", "Beek", "Beekdaelen", "Beemster", "Beesel", "Berg en Dal", "Bergeijk", "Bergen (L.)", "Bergen (NH.)", "Bergen op Zoom", "Berkelland", "Bernheze", "Best", "Beuningen", "Beverwijk", "Bladel", "Blaricum", "Bloemendaal", "Bodegraven-Reeuwijk", "Boekel", "Borger-Odoorn", "Borne", "Borsele", "Boxmeer", "Boxtel", "Brabantse Wal", "Breda", "Brielle", "Bronckhorst", "Brummen", "Brunssum", "Bunnik", "Bunschoten", "Buren", "Capelle aan den IJssel", "Castricum", "Coevorden", "Cranendonck", "Cuijk", "Culemborg", "Dalfsen", "Dantumadiel", "De Bilt", "De Fryske Marren", "De Ronde Venen", "De Wolden", "Delft", "Delfzijl", "Den Helder", "Deurne", "Deventer", "Diemen", "Dinkelland", "Doesburg", "Doetinchem", "Dongen", "Dordrecht", "Drechterland", "Drimmelen", "Dronten", "Druten", "Duiven", "Echt-Susteren", "Edam-Volendam", "Ede", "Eemnes", "Eersel", "Eijsden-Margraten", "Eindhoven", "Elburg", "Emmen", "Enkhuizen", "Enschede", "Epe", "Ermelo", "Etten-Leur", "Ferwerderadiel", "De Fryske Marren", "Geertruidenberg", "Geldrop-Mierlo", "Gemert-Bakel", "Gennep", "Gilze en Rijen", "Goeree-Overflakkee", "Goes", "Goirle", "Gooise Meren", "Gorinchem", "Gouda", "Grave", "Groningen", "Gulpen-Wittem","Haaksbergen", "Haaren", "Haarlem", "Haarlemmermeer", "Halderberge", "Hardenberg", "Harderwijk", "Hardinxveld-Giessendam", "Harlingen", "Hattem", "Heemskerk", "Heemstede", "Heerde", "Heerenveen", "Heerhugowaard", "Heerlen", "Heeze-Leende", "Heiloo", "Hellendoorn", "Hellevoetsluis", "Helmond", "Hendrik-Ido-Ambacht", "Hengelo", "Het Hogeland", "Heumen", "Heusden", "Hillegom", "Hilvarenbeek", "Hilversum", "Hoeksche Waard", "Hof van Twente", "Hollands Kroon", "Hoogeveen", "Hoorn", "Horst aan de Maas", "Houten", "Huizen", "Hulst", "Huntum","IJsselstein", "Kaag en Braassem", "Kampen", "Katwijk", "Kerkrade", "Koggenland", "Krimpen aan den IJssel", "Krimpenerwaard", "Laarbeek", "Landerd", "Landgraaf", "Landsmeer", "Langedijk", "Lansingerland", "Laren", "Leeuwarden", "Leiden", "Leiderdorp", "Leidschendam-Voorburg", "Lelystad", "Leudal", "Leusden", "Lingewaard", "Lisse", "Lochem", "Loon op Zand", "Lopik", "Loppersum", "Losser", "Maasdriel", "Maasgouw", "Maassluis", "Maastricht", "Medemblik", "Meerssen", "Meierijstad", "Meppel", "Middelburg", "Midden-Delfland", "Midden-Drenthe", "Mill en Sint Hubert", "Moerdijk", "Molenlanden", "Montferland", "Montfoort", "Mook en Middelaar", "Neder-Betuwe", "Nederweert", "Nieuwegein", "Nieuwkoop", "Nijkerk", "Nijmegen", "Nissewaard", "Noardeast-Fryslân", "Noord-Beveland", "Noordenveld", "Noordoostpolder", "Noordwijk", "Nuenen, Gerwen en Nederwetten", "Nunspeet", "Oegstgeest", "Oirschot", "Oisterwijk", "Oldambt", "Oldebroek", "Oldenzaal", "Olst-Wijhe", "Ommen", "Oost Gelre", "Oosterhout", "Ooststellingwerf", "Oostzaan", "Opmeer", "Opsterland", "Oss", "Oude IJsselstreek", "Ouder-Amstel", "Oudewater", "Overbetuwe", "Papendrecht", "Peel en Maas", "Pekela", "Pijnacker-Nootdorp", "Purmerend", "Putten", "Raalte", "Reimerswaal", "Renkum", "Renswoude", "Reusel-De Mierden", "Rheden", "Rhenen", "Ridderkerk", "Rijssen-Holten", "Rijswijk", "Roerdalen", "Roermond", "Roosendaal", "Rotterdam", "Rozendaal", "Rucphen", "Schagen", "Schiedam", "Schiermonnikoog", "Schouwen-Duiveland", "Simpelveld", "Sint Anthonis", "Sint Eustatius", "Sint-Michielsgestel", "Sittard-Geleen", "Sliedrecht", "Sluis", "Smallingerland", "Soest", "Someren", "Son en Breugel", "Stadskanaal", "Staphorst", "Stede Broec", "Steenbergen", "Steenwijkerland", "Stein", "Stichtse Vecht", "Strijen", "Súdwest-Fryslân", "Ten Boer", "Terneuzen", "Terschelling", "Texel", "Teylingen", "Tholen", "Tiel", "Tietjerksteradeel", "Tilburg", "Tubbergen", "Twenterand", "Tynaarlo", "Tytsjerksteradiel"];

    const regEx = new RegExp("(" + address.join("|") + ")", "gi");
    
    content = content.replace(regEx, function(match){
     return "x".repeat(match.length);
    });
   
    console.log(content);
    return(content);
  
   
}

 sanitizeData("1012 KD is my postal. My number is +3161234567. email is hridayesh3@gmail.com also NL91ABNA0417164300");
