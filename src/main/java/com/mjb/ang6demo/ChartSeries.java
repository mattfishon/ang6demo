package com.mjb.ang6demo;

import java.util.ArrayList;
import java.util.List;

public class ChartSeries {

	
	private String name;
	private List<ChartDetail> series;
	
	public ChartSeries() {
		series = new ArrayList<ChartDetail>();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<ChartDetail> getSeries() {
		return series;
	}
	public void setSeries(List<ChartDetail> serie) {
		this.series = serie;
	}
	public void addSeries(ChartDetail serie) {
		this.series.add( serie );
	}
	
	
}
