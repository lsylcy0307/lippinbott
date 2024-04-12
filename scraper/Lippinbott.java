import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.*;
import java.util.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Lippinbott {
    Map<String, String> content = new TreeMap<>();
    ArrayList<String> commonWords = new ArrayList<>();
    public Lippinbott(String root) {
        loadWords();
        createMap(root);
        writeContentToCSV("./outputGuides.csv");
    }
    private void loadWords() {
        try {
            String fileName = "./src/commonWords.txt";
            File file = new File(fileName);
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String line = br.readLine();
            while (line != null) {
                commonWords.add(line);
                line = br.readLine();
            }
        } catch (Exception ignore) {

        }
    }
    private void createMap(String root) {
        Set<String> furtherSearch = new TreeSet<>();
        try {
            String fileName = "./src/libraryLinks.txt";
            File file = new File(fileName);
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String line = br.readLine();
            while (line != null) {
                if (!line.contains("collapse") && !line.contains("hometabs") && !line.contains("pdf")) {
                    System.out.println(line);
                    try {
                        Document doc = Jsoup.connect(line).timeout(2000).get();
                        String text = doc.text();
                        text = text.split("Search this Guide")[1];
                        for (String word: commonWords) {
                            text = text.replaceAll(" " + word + " ", "");
                        }
                        text = text.replaceAll(",", "");
                        Elements links = doc.select("a[href]");
                        for (Element link : links) {
                            if (link.attr("abs:href").contains("guides.library.upenn.edu")) {
                                furtherSearch.add(link.attr("abs:href"));
                            }
                        }
                        content.put(line, text);
                    } catch (Exception ignore) {

                    }
                }
                line = br.readLine();
            }
            br.close();
            for (String link: furtherSearch) {
                if (link.contains("http") && !link.contains(".pdf") && !link.contains(".jp") && !link.contains(".png")) {
                    System.out.println(link);
                    try {
                        Document doc = Jsoup.connect(link).timeout(2000).get();
                        String text = doc.text();
                        text = text.split("Search this Guide")[1];
                        for (String word: commonWords) {
                            text = text.replaceAll(" " + word + " ", "");
                        }
                        text = text.replaceAll(",", "");
                        content.put(link, text);
                    } catch (Exception ignore) {

                    }
                }
            }
        } catch (Exception ignore) {

        }
    }
    private void writeContentToJson(String outputFile) {
        JSONArray jsonArray = new JSONArray();

        for (Map.Entry<String, String> entry : content.entrySet()) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("link", entry.getKey());
            jsonObject.put("text", entry.getValue());
            jsonArray.put(jsonObject);
        }

        try (FileWriter file = new FileWriter(outputFile)) {
            file.write(jsonArray.toString(4));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void writeContentToCSV(String outputFile) {
        File csvOutputFile = new File(outputFile);
        try (PrintWriter pw = new PrintWriter(csvOutputFile)) {
            for (Map.Entry<String, String> entry : content.entrySet()) {
                pw.println(entry.getKey() + "," + entry.getValue());
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
