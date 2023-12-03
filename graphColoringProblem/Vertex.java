import java.util.ArrayList;
import java.util.List;

public class Vertex {
    String name;
    List<Vertex> adjacentVertices;
    boolean colored;
    String color;

    public Vertex(String name){
        this.name = name;
        this.adjacentVertices = new ArrayList<>();
        this.colored = false;
        this.color = "";
    }

    public void addNeighbor(Vertex vertex){
        this.adjacentVertices.add(vertex);
        vertex.adjacentVertices.add(this);
    }
}
