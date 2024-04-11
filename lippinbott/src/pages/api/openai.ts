// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

type Data = {
  name: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  // k-nearest?
  const resource1 = "Catalog Record: Foot-prints of vanished races in the... | HathiTrust Digital Library Skip to main Skip to similar items Foot-prints of vanished races in the Mississippi valley : being an account of some of the monuments and relics of pre-historic races scattered over its surface, with suggestions as to their origin and uses / by A. J. Conant. Description Tools Cite this Export citation file Main Author Conant, A. J. (Alban Jasper), 1821-1915 Language(s) English Published St. Louis : C.R. Barns, 1879. Subjects Mound-builders > Mound-builders / Mississippi River Valley. Mississippi River Valley > Mississippi River Valley / Antiquities. Note Previously published in William Switzler's Illustrated history of Missouri (St. Louis, 1879) under title: Archaeology. The mounds and their builders. Physical Description x, 122 p. : ill. ; 27 cm. Locate a Print Version Find in a library Viewability Item Link Original Source Full view Harvard University Full view Harvard University Full view Cornell University Full view University of Illinois at Urbana-Champaign Full view New York Public Library Full view University of California View HathiTrust MARC record Similar Items Annual report Author New Jersey. Bureau of Industrial Statistics. Published 1878 Cigar Makers' Official Journal Author Cigar Markers' International Union of America. Published 1875 Dental record; a monthly journal of dental science art and literature Author Odonto-Chirurgical Society of Scotland. Published 1881 Transactions Author Norfolk and Norwich Naturalists' Society, Norwick Eng. Published 1874 The Medical world Published 1883 The Medical brief. A monthly journal of scientific medicine and surgery Published 1875 The Medical chronicle; a monthly record of the progress of medical schince Author Owens College. Medical Dept. Published 1884 Indian notes and queries Published 1883 Proceedings Author International Association of Officials of Bureaus of Labor, Factory Inspection and Industrial Commissions. Published 1883 The Organon Author Lippe, Adolph, 1812-1888. Published 1878";
  const resource2 = "Overview - Community Health Data Base - Penn Libraries data resources - Guides at Penn Libraries Skip to Main Content Skip to Guides Search Skip to breadcrumb Skip to main content Skip to footer Skip to chat link Report accessibility issues and get help Go to Penn Libraries Home Go to Franklin catalog Type your search Search Penn Libraries Guides Data & GIS Community Health Data Base - Penn Libraries data resources Overview Search this GuideSearch Community Health Data Base - Penn Libraries data resources: Overview Data sets, online data analysis tools, and reports from the biennial Philadelphia-area public health survey conducted by the Public Health Management Corporation. Overview CHDB Demographic Product CHDB Southeastern PA HHS Microdata CHDB Berks-Lancaster-Schuylkill HHS microdata CHDB Centre County HHS Microdata About the CHDB Community Health Data Base 2018 Multi-Year Data Guide A quick overview of questions asked in CHDB Southeastern Pennsylvania Household Health Surveys, 1996-2018. CHDB Member Listing CHDB Reports and News The CHDB website appears to be undergoing renovation. You can search for recent CHDB reports and briefings by using the home page's \"Search\" box. The temporary links below point to Internet Archive-preserved versions of CHDB web pages that list reports. These will report on the 2015 SEPA HHS data and earlier years of the CHDB. (7/23/2018) CHDB Press Releases (Internet Archive, 2/16/2017) CHDB Reports and Briefs (Internet Archive, 7/11/2017) Recent findings from the CHDB. Earlier briefs, 2003-2014, are available on the old CHDB web site. CHDB Presentations (Internet Archive, 7/11/2017) CHDB Community Dashboard (Internet Archive, 2/16/2017) Reports and briefings arranged by topic. CHDB Online Data Analysis Tool The CHDB Online Data Analysis Tool provides quick access to selected variables from the Southeastern Pennsylvania Household Health Survey through aggregated tables. Data are aggregated for ZIP Codes within Philadelphia and Bucks, Chester, Delaware, and Montgomery Counties, 2000-2018 (even years only). Great for quick facts about a ZIP Code area. CHDB Online Data Analysis Tool PennKey required Creates tables for selected SEPA HHS survey variables. Geographic coverage: ZIP Codes in Philadelphia and Bucks, Chester, Delaware, and Montgomery Counties. Years covered: 2000-2018 (even years only). Populations: Adults, Children (0-17), Older Adults (age 60+). Variables: Health status, health behaviors, access and barriers to healthcare, health screens, and community and economy. Crosstabulations: Age, gender, race/ethnicity, poverty status, insurance status, religion. CHDB Microdata Data Sets The CHDB Household Health Survey microdata data sets are the individual questionnaire responses from each survey cycle. Using these microdata sets will require statistical processing software such as SPSS, as individual responses are provided with statistical weighting to generate population-wide estimates. Community Health Data Base - Southeastern Pennsylvania Household Health Survey Microdata PennKey required Geographic coverage: Philadelphia County and Bucks, Chester, Delaware, and Montgomery Counties. Years covered: 1994-2018 (even years only). Sample size: Approximately 10,000 households per year. Four data files for each year: Adult, Child, 60+ Supplement (Elderly), Combination. Community Health Data Base - Berks-Lancaster-Schuylkill Household Health Survey Microdata PennKey required Geographic coverage: Berks, Lancaster, and Schuylkill Counties, Pennsylvania. Years covered: 2008 and 2011. Sample size: Approximately 1,000 households per county per year. One data file for each year: Adult. Community Health Data Base - Centre County Household Health Survey Microdata PennKey required Geographic coverage: Centre County, Pennsylvania. Years covered: 2009 only. Sample size: Approximately 1,250 households. One data file: Adult. Librarian & Coordinator of Social Sciences Collections Lauris Olson Email Me Schedule Appointment Contact: University of Pennsylvania Libraries 203 Van Pelt-Dietrich Library Center University of Pennsylvania 3420 Walnut Street Philadelphia, PA 19104-6206 U.S.A. 215-898-0119 Website Subjects: African Studies, Aging Studies, Communication, Criminology, Data & GIS, Economics, Food Studies, Health & Societies, Immigration, Linguistics, Philadelphia Studies, Population Studies & Demography, Social Sciences, Sociology, Urban Studies Next: CHDB Demographic Product >> Last Updated: Feb 20, 2023 10:48 AM URL: https://guides.library.upenn.edu/CHDB Print Page Login to LibApps Report a problem. Subjects: Communication, Data & GIS, Health & Life Sciences, Health & Societies, Health Care Management, Philadelphia Studies, Population Studies & Demography, Social Policy & Practice, Sociology 3420 Walnut Street, Philadelphia, PA 19104-6206 Penn Libraries Home Franklin Home (215) 898-7555 University of Pennsylvania Report Accessibility Issues and Get Help Penn Libraries Privacy Policy";
  const resource3 = "Company Information - Engineering Entrepreneurship - Guides at Penn Libraries Skip to Main Content Skip to Guides Search Skip to breadcrumb Skip to main content Skip to footer Skip to chat link Report accessibility issues and get help Go to Penn Libraries Home Go to Franklin catalog Type your search Search Penn Libraries Guides Engineering Engineering Entrepreneurship Company Information Search this GuideSearch Engineering Entrepreneurship: Company Information Guide for Engineering Entrepreneurship classes Overview Patents Market Research & Industry Analysis Company Information News & Articles Business Planning & Financial Ratios Marketing Funding People Directories D&B Hoovers Search by company name or industry. Includes brief industry reports and competitors list. Data Axle Reference Solutions (formerly ReferenceUSA) Directory information on U.S. and Canadian business, health care, and residential listings. Search by company name, geographic area, business type, industry code, yellow page listing, revenue, location, number of employees or in combination. Nexis Dossier Company profiles, financials, SEC filings, stock performance, M&A activity, news, and more. Includes Corporate Affiliations reports: international directory of corporate structure for public and private companies, with subsidiary listings and corporate linkage information on parent companies and their affiliates. Includes historical information going back to the mid-1990s. ThomasNet Connects buyers, engineers, and MRO professionals to over 500,000 North American manufacturers daily. Analyst Reports LSEG Workspace (formerly Refinitiv Workspace) To find analyst reports for a specific company, search for the firm's ticker symbol or name in the top search box. On the News & Research menu, click on Company Research. Use filters on the left-side menu to refine your search. Click the Search button. To screen for analyst reports based on a set of criteria, select Research --> Advanced Research from the main menu. Use filters on the left-side menu to refine your search. Click the Search button. NOTE: Refinitiv Workspace users may access a maximum of 150 pages of research content daily. This limit resets at 12:00 AM Eastern Time each day. For additional resources for analyst reports, please refer to our Business FAQ. Company Financials Use these databases to find SEC filings and financial data. Filings will offer company assets and liabilities in dollar figures, income data, operating expensese, sales, etc. S-1s will give you prospectus/founder information; 10-Ks offer annual accounting; Proxy Statements include executive compensation; and Annual Reports often include a management discussion. S&P Capital IQ Profiles of public and private firms worldwide including financials, officers and directors, ownership, advisory relationships, transactions, securities, key developments, estimates, key documents, credit ratings and research, filings, news, comparables analysis and more. PitchBook Investment trends and transactions in private equity and venture capital sectors, as well as public company information. Includes profiles of companies and investors with financial and deal information. LSEG Workspace (formerly Refinitiv Workspace) Access to current and historical data, including financial statements, filings, stock prices, earnings estimates, deals, analyst reports, and more. Privco Directory of privately-held companies. Company information consists of a business summary, an overview of corporate organization, list of competitors, industry description, financials (almost always revenue only) and number of employees. Provides M&A deals and deal multiples, private firm valuations, VC funding, private equity deal history; and private and family ownership data. Factiva Click on Companies/Markets and search by ticker or company name. Go to Search => Search Builder to search for news stories. << Previous: Market Research & Industry Analysis Next: News & Articles >> Last Updated: Feb 8, 2024 5:10 PM URL: https://guides.library.upenn.edu/EngineeringEntrepreneurship Print Page Login to LibApps Report a problem. Subjects: Business, Engineering, Entrepreneurship Tags: EAS 545, EAS 546, EAS545, EAS546, engineering, entrepreneurship 3420 Walnut Street, Philadelphia, PA 19104-6206 Penn Libraries Home Franklin Home (215) 898-7555 University of Pennsylvania Report Accessibility Issues and Get Help Penn Libraries Privacy Policy";
  const resource4 = "2010 Census - U.S. Census Demographic Data - Guides at Penn Libraries Skip to Main Content Skip to Guides Search Skip to breadcrumb Skip to main content Skip to footer Skip to chat link Report accessibility issues and get help Go to Penn Libraries Home Go to Franklin catalog Type your search Search Penn Libraries Guides Data & GIS U.S. Census Demographic Data 2010 Census Search this GuideSearch U.S. Census Demographic Data: 2010 Census A guide to finding and using population data from the U.S. Census Bureau Overview 2010 Census American Community Survey Historical Census Manuscript & Microdata Mapping the Census 2010 Census Overview The 2010 Census collected data from all U.S. households on: Sex Hispanic/Non-Hispanic Age Household Relationships Race Housing Tenure (own or rent) (It did not collect data on socioeconomic, occupational, or educational topics previously gathered from the Census Short Form; for this see the American Community Survey.) The Decennial Census provides the greatest level of geographic detail. Data are available for the following geographic areas: Access 2010 Data Social Explorer Easy to access maps and tables from 1790-2010 census, plus American Community Survey through 2015. Downloadable in Excel, CSV, SPSS, SAS, and Stata file formats. Data.census.gov (aka Explore Census Data) The US Census Bureau's primary delivery platform for the American Community Survey, the most recent Decennial Census, and other Census Bureau data releases. United States Census Bureau Data Repository A thematic data archive hosted by ICPSR for the US Census Bureau. This archive provides full-dataset downloads for Census Bureau microdata and aggregate data files. Some datasets are provided with SDA crosstabulation tools. Census FTP Useful for downloading data at all geographic levels for an entire state, which can be cumbersome through AFF. Requires MS Access or statistical software; for advanced users only. Census.IRE.Org From Investigative Reporters and Editors, the same Census 2010 data as AFF at tract, place, county, county subdivision, state, or national levels in a no-frills interface. Downloadable as CSV or JSON. More about 2010 Census Data Products Release Schedule The Decennial Census is released in a number of data sets over several years. Summary File 1 (SF1) is probably the most frequently used. Overview of Race and Hispanic Origin Explains racial and ethnic categories << Previous: Overview Next: American Community Survey >> Last Updated: Nov 6, 2023 11:42 AM URL: https://guides.library.upenn.edu/us_census Print Page Login to LibApps Report a problem. Subjects: City & Regional Planning, Data & GIS, Population Studies & Demography, Social Policy & Practice, Social Sciences, Sociology, Urban Studies Tags: census, demographics, social science data, united states, urban studies 3420 Walnut Street, Philadelphia, PA 19104-6206 Penn Libraries Home Franklin Home (215) 898-7555 University of Pennsylvania Report Accessibility Issues and Get Help Penn Libraries Privacy Policy";
  const resource5 = "Historical Census - U.S. Census Demographic Data - Guides at Penn Libraries Skip to Main Content Skip to Guides Search Skip to breadcrumb Skip to main content Skip to footer Skip to chat link Report accessibility issues and get help Go to Penn Libraries Home Go to Franklin catalog Type your search Search Penn Libraries Guides Data & GIS U.S. Census Demographic Data Historical Census Search this GuideSearch U.S. Census Demographic Data: Historical Census A guide to finding and using population data from the U.S. Census Bureau Overview 2010 Census American Community Survey Historical Census Manuscript & Microdata Mapping the Census Understanding the Historical Census Measuring America Questionnaires, schedules, and census procedures for 1790-2000 census IPUMS-USA Variables Select variables to understand how census questions have changed over time. U.S. Census Bureau Catalog and Guide Annual catalogs of official US Census Bureau publications, 1946-1990, when publication ceased. Bureau of the Census catalog of publications, 1790-1972 (GPO, 1974) Two titles in one huge volume : \u2022 Catalog of United States census publications, 1790-1945 / Henry J. Dubester (GPO, 1950). \u2022 Bureau of the Census catalog of publications, 1946-1972 (GPO, 1974). Historical Census Data Social Explorer Easy to access maps and tables from 1790-2010 census, plus American Community Survey through 2015. Downloadable in Excel, CSV, SPSS, SAS, and Stata file formats. Census Decennials Published Decennial Census results from 1790-present in zipped PDF format, useful for finding city-level information not available at other sites. Alternate versions - and many volumes missing here - may be found in the HathiTrust Digital Library. IPUMS-USA NHGIS Tables and GIS boundary files for 1790-2010 census. Ready to use with ArcGIS. Longitudinal Tract Data Base 1970-2010 demographic variables normalized to 2010 census tract boundaries, plus a Stata program for normalizing any data into 2010 tracts. LTDB is from Brown University. Unified Enumeration District Finder Uses decennial census enumeration district boundary descriptions to assign enumeration districts IDs to street addresses. Ancestry Library Do it yourself! Page image reproductions of decennial census schedules, for browsing and searching. Also includes state census schedules and other genealogical data. 1880 Enumeration District Boundaries From the Urban Transition Historical GIS Project, enumeration district boundaries available in shapefile and web map formats. Small-Area Historical Census Statistics Social Explorer is the most comprehensive source for Census data, but it is missing small-area statistics for earlier years. It does not contain areas smaller than county from before 1940, or areas smaller than census tract from before 1990. These tables can be found in print versions of the Decennial Census, listed below. Maps of ward can be found in the Genealogy of Philadelphia County Subdivisions. 1960 Census of housing, 1960. Volume III, City blocks: Philadelphia, Pa. Final report HC(3)-344. Washington, D.C.: U.S. GPO, 1962. PDF. At the library. 1950 Census of housing[, 1950], taken as part of the seventeenth decennial census of the United States. Block statistics. Volume 5, part 143, Philadelphia, Pa. Washington, D.C.: U.S. GPO, 1952. Online. At the library. 1940 16th census of the United States, 1940. Housing. Supplement to the first series, housing bulletin for Pennsylvania: Philadelphia block statistics. Washington, D.C.: U.S. GPO, 1942. Online. 1930 \"Table 23. Population by Sex, Color, Age, etc., for Cities of 50,000 or More by Wards. \" In U.S. Census, 1930: Population. Vol. III Part 2. Washington: Government Printing Office, 1933. Online. At the library. \"Table 24. Classification of Families, Etc., for Ward of Cities or 100,000 or More (PDF).\" In U.S. Census, 1930: Population. Vol. VI. Washington: Government Printing Office, 1933. Online. At the library. 1920 \"Table 13. Composition and Characteristics of the Population for Ward of Cities of 50,000 or More.\" In U.S. Census, 1920: Population. Vol. III. Washington: Government Printing Office, 1922. Online. At the library. 1910 \"Table 5. Composition and Characteristics of the Population for Wards of Cities of 50,000 or More (PDF).\" In U.S. Census, 1910: Abstract with Pennsylvania Supplement. Washington: Government Printing Office, 1913. PDF. At the library. 1900 \"Table 5. Population of States and Territories by Minor Civil Divisions: 1890 and 1900.\" In U.S. Census 1900: Population. Vol I. Washington: Government Printing Office, 1901. Online. At the library. \"Table 23. Population by Sex, General Nativity, and Color, for Places Having 2,500 Inhabitants or More.\" In U.S. Census 1900: Population. Vol I. Washington: Government Printing Office, 1901. Online. At the library. \"Table 27. Persons of School, Militia, and Voting Ages, by Sex, General Nativity, and Color, for Places Having 2,500 Inhabitants or More.\" In U.S. Census 1900: Population. Vol II. Washington: Government Printing Office, 1901. Online. At the library. \"Table 101. Number of Dwellings Having Specified Number of Families, with Average Number of Families to a Dwelling.\" In U.S. Census 1900: Population. Vol II. Washington: Government Printing Office, 1901. Online. At the library. \"Table 104. Population, Dwellings, and Families , for Places Having 2,500 Inhabitants or More.\" In U.S. Census 1900: Population. Vol II. Washington: Government Printing Office, 1901. Online. At the library. \"Table 107. Private Families Occupying Owned and Hired and Free and Encumbered Homes, for Places Having 2,500 Inhabitants or More.\" In U.S. Census 1900: Population. Vol II. Washington: Government Printing Office, 1901. Online. At the library. 1890 \"Table 19. Population by Sex, General Nativity, and Color, of Place Having 2,500 Inhabitants or More: 1890.\" In U.S. Census, 1890. Report on Population of the United States at the Eleventh Census. Vol. I, Part I.Washington: Government Printing Office, 1895. Online. At the library. \"Table 89. Total Dwellings and Families, and Persons to a Dwelling and to a Family, for Places Having 2,500 Inhabitants or More: 1890.\" In U.S. Census, 1890. Report on Population of the United States at the Eleventh Census. Dwellings and Families. Washington: Government Printing Office, 1895. Online. At the library. \"Table 1. Population, Births, Deaths, and Death Rates at Certain Ages, and Deaths from Certain Causes, with Distinction of Sex, Color, General Nativity, and Parental Nativity.\" In U.S. Census, 1890. Report on Population of the United States at the Eleventh Census. Vital Statistics. Washington: Government Printing Office, 1895. Online. 1880 \"Table XIX.Population of Minor Civil Divisions - Pennsylvania.\" p. 277. In U.S. Census, 1890. Compendium of the Tenth Census. Part I. Washington: Government Printing Office, 1883. Online. At the library. 1870 \"Table III. Population of Civil Divisions Less Than Counties.\" In U.S. Census, 1870. Vol. 1. Washington: Government Printing Office, 1872. PDF. At the library. \"Table XI. School Attendance and Illiteracy. Fifty Principal Cities. In U.S. Census, 1870. Vol. 1. Washington: Government Printing Office, 1872. At the library. \"Table XXI. Families and Dwellings of Fifty Cities.\" In U.S. Census, 1870. Vol. 1. Washington: Government Printing Office, 1872. PDF. At the library. 1860 \"Table 3. Population of Cities, Town, etc.\" In U.S. Census, 1860. Population of the United States in 1860 : compiled from the original returns of the eighth census. Washington: Government Printing Office, 1864. Online. 1850 \"Table II. Population of by Subdivisions of Counties.\" In U.S. Census, 1850. Washington: Government Printing Office, 1853. Online. << Previous: American Community Survey Next: Manuscript & Microdata >> Last Updated: Nov 6, 2023 11:42 AM URL: https://guides.library.upenn.edu/us_census Print Page Login to LibApps Report a problem. Subjects: City & Regional Planning, Data & GIS, Population Studies & Demography, Social Policy & Practice, Social Sciences, Sociology, Urban Studies Tags: census, demographics, social science data, united states, urban studies 3420 Walnut Street, Philadelphia, PA 19104-6206 Penn Libraries Home Franklin Home (215) 898-7555 University of Pennsylvania Report Accessibility Issues and Get Help Penn Libraries Privacy Policy";
  
  const resource = `Resource 1: ${resource1} \n
                    Resource 2: ${resource2} \n
                    Resource 3: ${resource3} \n
                    Resource 4: ${resource4} \n
                    Resource 5: ${resource5} `;

  console.log(prompt);          
  
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{"role": "user", "content": `
      
      Your goal is to assist users in finding resources related to their academic research topics, as well as guide them on the next steps for their research. You have access to a database of text data (~10 entries) scraped from the online library, which is attached at the end of this prompt.

      My query is: ${prompt.prompt}.

      1. Determine the research topic or specific question I am asking about in my query.

      2. Search the database of ~10 text data entries attached at the end of the prompt and identify the most relevant resources for my query. 

      3. For each relevant resource, you will return information in JSON format:

         {
           "title": "{resource title}",
           "description": "{resource description}",
           "link": "{website link}",
           "recommendation": "{next step recommendation}",
           "next_queries" : "{next queries}",
         }

         "description" includes a brief summary or description of each resource, giving me an overview of what the resource offers.

         "link" is the website link to where you found the resource so I can access it directly.

         "recommendation" includes ideas next steps for my research journey based on my query and the resources you've shared.

         for "next_queries", generate some potential follow-up questions for me to copy and paste for future queries.

      4. Provide at least three different relevant resources for my query. Feel free to include more resources if they are pertinent to the topic.

      Stay concise and focused in your response. Aim to provide actionable guidance.
      At the end, ONLY provide the JSON format response. Do not include additional commentary or descriptions outside of the JSON object.

      ----------
      
      Resources: ${resource}`}], 

    });
    
    const resp = chatCompletion.choices[0].message.content; //get the content from the api response
    return res.status(200).json({ resp });
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
